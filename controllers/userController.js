require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const getJWTtoken = require('../middlewares/getJWTtoken');
const { validateUser } = require('../validation/validationUser');

const createUser = async (req, res, next) => {
  const { error } = await validateUser.validate(req.body);
  if (error) {
    return next(new Error(error));
  }
  const { firstName, lastName, email, password, role, dateOfBirth, country } =
    req.body;

  const isUser = await User.findOne({ email });

  if (isUser) {
    return next(
      new Error(`This ${isUser.role} already exists. Please log in!`)
    );
  }

  const enryptedPassword = bcrypt.hashSync(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: enryptedPassword,
    role,
    dateOfBirth,
    country,
  });

  if (user) {
    res.status(201).json({
      message: `This ${role} has been successfully created`,
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: `Bearer ${getJWTtoken(user)}`,
    });
  } else {
    return next(new Error('Invalid data'));
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: getJWTtoken(user),
    });
  } else {
    return next(new Error('Invalid credentials'));
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
};
