# budgetify

$ npm i

* create .env file 
* add PORT variable to .env file
* add secret key to variable SECRET_KEY_JWT
* add expire period to variabel JWT_EXPIRES_IN
* add DATABASE_URL and DATABASE_PASSWORD

To get all the users from Users API- only admin is allowed with token and role admin

To register a user or admin, we have to send following inputs from body of Users Register API
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin1@gmail.com",
    "password": "12345678",
    "role": "admin",
    "dateOfBirth": "17/12/2001",
    "country": "USA"
}

If the user or admin arleady exists in the database, It warns you to log in.

When you log in, it sends token. With that token, it is possible to get requests for admin not for users because for now they have no any related database other than their account.  


