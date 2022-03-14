# budgetify

$ npm i

* create .env file 
* add PORT variable to .env file
* add secret key to variable SECRET_KEY_JWT
* add expire period to variabel JWT_EXPIRES_IN

To get all the users from Users API- only admin is allowed with token and role admin

To register a user or admin, we have to send following inputs from body of Users Register API
{
    "email": "yourMail@gmail.com",
    "name": "YourName",
    "surname": "YourSurname",
    "password": "YourPass",
    "role": "admin"
}

If the user or admin arleady exists in the mock database, It warns you to log in.

When you log in, it sends token. With that token, it is possible to get requests for admin not for users because for now they have no any related database other than their account.  


