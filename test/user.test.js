/* eslint-disable */ 
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../app');

const dbURL = process.env.DATABASE_URL.replace('<password>',process.env.DATABASE_PASSWORD);
let token = '';
describe ('app', () => {

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
                const response = await supertest(app).post('/users/register').send(
                    {
                        firstName: "John",
                        lastName: "Doe",
                        email: "admin1@gmail.com",
                        password: "12345678",
                        role: "admin",
                        dateOfBirth: "17/12/2001",
                        country: "USA"
                    }
               );
              expect(response.text).toBe("This admin already exists. Please log in!");
    
            });
        });
    
        describe('POST /register', () => {
            it('should return Incomplete data', async () => {        
                const response = await supertest(app).post('/users/register').send({firstName: 'Mike'});
                expect(response.text).toBe('Incomplete data');
            });
        });
    
    
        describe('POST /login', () => {
            it('should return user details in JSON format', async () => {        
                const response = await supertest(app).post('/users/login').send({
                    email: "admin1@gmail.com", 
                    password: "12345678" 
                });
                expect(response.header['content-type']).toBe(
                    'application/json; charset=utf-8'
                );
                token = response.body.token;
            });
        });
    
        describe('POST /login', () => {
            it('should return Invalid credentials', async () => {        
                const response = await supertest(app).post('/users/login').send({email: 'immcsl', password: '123467'});
                expect(response.text).toBe('Invalid credentials');
            });
        });
    });

    

    describe('GET /users', () => {
        describe('GET all the users', () => {
            it('should return all the users given the role is admin', async () => {
                
                const response = await supertest(app).get('/users/').set(
                    'Authorization',
                    `Bearer ${token}`
                );

                expect(response.header['content-type']).toBe(
                    'application/json; charset=utf-8'
                );
            });
        });
    });


    // describe('GET/ test', () => {
    //     it('should return Hello', async () => {
    //         const response = await supertest(app).get('/users/hello');
    //         expect(response.text).toBe('Hello');
    //     });
    // }); 
    
    

});