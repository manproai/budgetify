const mongoose = require('mongoose');

const userAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    accountName: {
      type: String,
      trim: true,
      required: true,
    },
    currencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Currency',
      required: [true, 'Account Currency is required'],
    },
    accountAmount: {
      type: Number,
      trim: true,
      default: 0,
    },
    accountDescription: {
      type: String,
      trim: true
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model('Account', userAccountSchema);

module.exports = {
  Account,
};
