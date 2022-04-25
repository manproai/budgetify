/* eslint-disable */

const bcrypt = require('bcrypt');

const usersData = [
  {
    email: 'email@gmail.com',
    name: 'John',
    surname: 'Doe',
    password: '$2b$10$o//ruQDxkvAtQODBuhfsYOZ/aCCTScnLMc62suRvQlTVfe6T.SIFO',
    role: 'admin',
  },
  {
    email: 'user1mail@gmail.com',
    name: 'Andrew',
    surname: 'Ng',
    password: '$2a$12$dvDDvcxQdVQVfyMi0snFVOUV97KflzbU3nK88moe4/uyK/vcuYaqm',
    role: 'user',
  },
  {
    email: 'user2mail@gmail.com',
    name: 'Rock',
    surname: 'Friedman',
    password: '$2a$12$bbwrdJXnxRt74hGiMNn4BuM8vQ5OzbMOInZgpzKteoSKIg.khxCl6',
    role: 'user',
  },
];

function getUserByEmail(email) {
  return usersData.find((user) => user.email == email);
}

function registerUser(user) {
  if (user.email && user.password && user.name && user.surname && user.role) {
    const isUser = getUserByEmail(user.email);
    if (isUser) {
      return 'registered';
    }
    usersData.push({
      id: Math.random(),
      email: user.email,
      name: user.name,
      surname: user.surname,
      password: bcrypt.hashSync(user.password, 10),
      role: user.role,
    });
    return user;
  }

  return false;
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (user && bcrypt.compareSync(password, user.password)) {
    return user;
  }
  return null;
}

module.exports = {
  registerUser,
  usersData,
  loginUser,
  getUserByEmail,
};
