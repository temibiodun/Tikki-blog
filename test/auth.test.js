const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const api = supertest(app);
jest.setTimeout(50000);

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useCreateIndex: true
    });
}
);
afterEach(() => {
    User.remove
}
);
afterAll(() => {
    mongoose.connection.close();
}
);
describe("Testing user routes", function () {
    it("should return 200 status code", async () => {
        const response = await api.get('/api/users');
        expect(response.status).toBe(200);
    });
}
);

describe("POST /api/register", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/register').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
);

describe("POST /api/login", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/login').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
);

// Tests for the POST /api
describe("POST /api/login", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/login').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
);
describe("POST /api/register", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/register').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
);
describe("POST /api/login", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/login').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
);
describe("POST /api/register", () => {
    it("should return 200 status code", async () => {
        const response = await api.post('/api/register').send({
            username: "test",
            password: "test"
        });
        expect(response.status).toBe(200);
    });
}
); 

afterAll(async () => {
    await mongoose.connection.close();
}
);
