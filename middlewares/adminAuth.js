const { User } = require('../models/userModel');

const adminGuard = async (req, res, next) => {
  const email = req.user.email;
  const user = await User.findOne({ email });
  const userRole = user.role;

  if (user && userRole == 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

module.exports = { adminGuard };
