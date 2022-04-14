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
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    dateOfBirth,
    country,
    gender,
  } = req.body;

  const getAvailableUser = await User.findOne({ email });

  if (getAvailableUser) {
    return next(
      new Error(`This ${getAvailableUser.role} already exists. Please log in!`)
    );
  }

  const enryptedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: enryptedPassword,
      role,
      dateOfBirth,
      country,
      gender,
    });

    res.status(201).json({
      message: `This ${role} has been successfully created`,
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      token: `Bearer ${getJWTtoken(user)}`,
    });
  } catch (err) {
    return next(new Error(err));
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
      expiresIn: process.env.JWT_EXPIRES_IN,
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
