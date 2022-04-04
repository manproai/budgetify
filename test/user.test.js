const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

const dbURL = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
let token = '';
describe('app', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(dbURL);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /', () => {
    describe('POST /register', () => {
      it('should say user is registered when tested two times', async () => {
        const response = await supertest(app).post('/users/register').send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'admin1@gmail.com',
          password: '12345678',
          role: 'admin',
          dateOfBirth: '17/12/2001',
          country: 'USA',
        });
        expect(response.text).toBe('This admin already exists. Please log in!');
      });
    });

    describe('POST /register', () => {
      it('should return Incomplete data', async () => {
        const response = await supertest(app)
          .post('/users/register')
          .send({ firstName: 'Mike' });
        expect(response.text).toBe('ValidationError: \"lastName\" is required');
      });
    });

    describe('POST /login', () => {
      it('should return user details in JSON format', async () => {
        const response = await supertest(app).post('/users/login').send({
          email: 'admin1@gmail.com',
          password: '12345678',
        });
        expect(response.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
        token = response.body.token;
      });
    });

    describe('POST /login', () => {
      it('should return Invalid credentials', async () => {
        const response = await supertest(app)
          .post('/users/login')
          .send({ email: 'immcsl', password: '123467' });
        expect(response.text).toBe('Invalid credentials');
      });
    });
  });

  describe('GET /users', () => {
    describe('GET all the users with auth', () => {
      it('should return all the users given correct auth', async () => {
        const response = await supertest(app)
          .get('/users/')
          .set('Authorization', `Bearer ${token}`);

        expect(response.header['content-type']).toBe(
          'application/json; charset=utf-8'
        );
      });
    });
    describe('GET all the users with incorrect auth', () => {
      it('should return all the users given incorrect auth', async () => {
        const response = await supertest(app)
          .get('/users/')
          .set('Authorization', `Bearer ${token}123`);

        expect(response.text).toBe('Unauthorized');
      });
    });
  });
});
