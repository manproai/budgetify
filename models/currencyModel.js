const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema(
  {
    currencyName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Currency name is required'],
    },
    currencySymbol: {
      type: String,
      trim: true,
      required: [true, 'Account Currency is required'],
    },
    currencyCreated: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const Currency = mongoose.model('Currency', currencySchema);

module.exports = {
  Currency,
};
