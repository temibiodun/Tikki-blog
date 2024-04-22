const express = require('express');
const router = express.Router();
const post = require('../models/post');
const { title } = require('process');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = ('../views/layouts/admin');

 const jwtSecret = process.env.JWT_SECRET;



 //check login

 const authMiddleware = (req, res, next ) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.userId;
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }



//admin-login page
router.get('/admin', async(req,res)=>{
    try {
        const locals = {
            title: "admin",
            description: "Simple Blog created with NodeJS, express and mongoDB."
        }
      res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
        console.log(error);
        
    }
});

//admin check login





router.post('/admin', async(req,res)=>{
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return  res.status(401).json({ message: 'ivalid credentions' });
        }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({ message: 'invalid credentials' });
            } 

            const token = jwt.sign({ userId: user._id}, jwtSecret);
            res.cookie ('token', token, { httpOnly: true });
            res.redirect('/dashboard');


    } catch (error) {
        console.log(error);
    }
});


router.get('/dashboard', authMiddleware,  async (req, res) => {

    try {
        const locals = {
            title: "dashboard",
            description: "Simple Blog created with NodeJS, express and mongoDB."
        }

        const data = await post.find();
        res.render('admin/dashboard', {
        locals,
        data,
        layout: adminLayout
    });

        
    } catch (error) {
        console.log(error);
        
    }
});







//admin create new post
router.get('/add-post', authMiddleware,  async (req, res) => {

    try {
        const locals = {
            title: "Add Post",
            description: "Simple Blog created with NodeJS, express and mongoDB."
        }

        const data = await post.find();
        res.render('admin/add-post', {
        locals,
        data,
        layout: adminLayout
    });

        
    } catch (error) {
        console.log(error);
        
    }
});
 //Post
 //admin create new post

 router.post('/add-post', authMiddleware,  async (req, res) => {

    try {

        try {

            const newPost = new post({
                title : req.body.title,
                body: req.body.body

            });

            await post.create(newPost);
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
            
        }

       
    } catch (error) {
        console.log(error);
    }
});



//Get
//admin create new post
router.get('/edit-post/:id', authMiddleware,  async (req, res) => {

    try {

        const locals = {
            title: "Edit Post",
            description: "Simple Blog created with NodeJS, express and mongoDB."
        }
        const data = await post.findOne({_id: req.params.id});
  

        res.render('admin/edit-post',{
            locals,
            data,
            layout: adminLayout 
        })



        
    } catch (error) {
        console.log(error);
        
    }
});
// route

//PUT
//admin create new post
router.put('/edit-post/:id', authMiddleware,  async (req, res) => {

    try {
        await post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        });

        res.redirect(`/edit-post/${req.params.id}`);



        
    } catch (error) {
        console.log(error);
        
    }
});
// router.post('/admin', async(req,res)=>{
//     try {

//         const {username, password} = req.body;
       

//         if (req.body.username === 'admin' && req.body.password === 'password'){
//             res.send('You are logged in successfully');

//         } else {
//             res.send('wrong username or password');
 
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });
//admin register
router.post('/register', async(req,res)=>{
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);



        try {
            const user = await User.create({  username, password:hashedPassword });
            res.status(201).json({ message:'User Created', user});
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'User already exists.'})
            }
            res.status(500).json({ message: 'internal server error'})
        }

    } catch (error) {
        console.log(error);
    }
});


//delete
//admin delete new post

router.delete('/delete-post/:id', authMiddleware,  async (req, res) => {
     try {
        await post.deleteOne( { _id: req.params.id });
        res.redirect('/dashboard'); 
        
     } catch (error) {
            console.log(error);

     }
     
});

//get
//admin logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    // res.json({ message: 'Logged out successfully' });
    res.redirect('/')
});




module.exports = router;