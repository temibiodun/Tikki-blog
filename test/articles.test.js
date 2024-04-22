const mongoose = require('mongoose');
const Article = require('../models/article');
const supertest = ('supertest');
const app = require('../server')
const User = require('../server/models/User');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useCreateIndex: true
    });
}
);
afterEach(()=>{Article.remove
    User.remove
}
)
afterAll(async () => {
    await mongoose.connection.close();
}
);
describe("Testing the article model", () => {
    it("should save an article", async () => {
        const article = new Article({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        });
        expect(await article.save()).toMatchObject(article);
    });
});

describe("GET /api/articles", () => {
    it("should return 200 status code", async () => {
        const response = await supertest(app).get('/api/articles');
        expect(response.status).toBe(200);
    });
}
);

describe("POST /api/articles", () => {
    it("should return 200 status code", async () => {
        const response = await supertest(app).post('/api/articles').send({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        });
        expect(response.status).toBe(200);
    });
    
    it('should create a valid article', async () => {
        const response = await supertest(app).post('/api/articles').send({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        }).expect(201);
        
        // check id is created automatically and added to response
        expect(response.body._id).toBeDefined();
    });
}
)

describe("GET /api/articles/:id", () => {
    it("should return 200 status code", async () => {
        const article = new Article({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        });
        let resArticle = await article.save();
        const response = await supertest(app).get(`/api/articles/${resArticle._id}`);
        expect(response.status).toBe(200);
    });
});

describe("PUT /api/articles/:id", () => {
    it("should return 200 status code", async () => {
        const article = new Article({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        });
        let imdbId = await article.save();
        const response = await supertest(app).put(`/api/articles/${imdbId._id}`).send({
            title: "test",
            content: "test",
            author: '5e987f3b3b3b3b3b3b3b3b3b'
        });
        expect(response.status).toBe(200);
        expect(response.body.author).toBe('5e987f3b3b3b3b3b3b3b3b3b');
    });
});






describe("DELETE /api/articles/:id", () => {
    it("should return 200 status code", async () => {
        const article = new Article({
            title: "test",
            content: "test",
            author: '5e986f3b3b3b3b3b3b3b3b3b'
        });
        let resArticle = await article.save();
        const response = await supertest(app).delete(`/api/articles/${resArticle._id}`);
        expect(response.status).toBe(200);
        // check if the data is deleted in the database
        const emptyResponse = await supertest(app).get(`/api/articles/${resArticle._id}`);
        expect(emptyResponse.status).toBe(404);
    });
});


describe("GET /api/articles/:id", () => {
    it("should return 404 status code", async () => {
        const response = await supertest(app).get('/api/articles/5e986f3b3b3b3b3b3b3b3b3b');
        expect(response.status).toBe(404);
    });
}
);
afterAll(()=>{
    mongoose.connection.close()
}
)
