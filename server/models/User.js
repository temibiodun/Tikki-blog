const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserScheema = new Schema({

    username: {
        type : String,
        required : true ,
        unique: true
    },

    password : {
        type : String,
        required : true ,
         
    },
    email : {
        type : String,
        required : true ,
        unique: true
    },
    
    firstName:{
        type :String , 
        required : true  
        
    } ,
    lastName :{
        type : String ,  
        required : true  
    } ,
    

});

module.exports = mongoose.model('User ', UserScheema);