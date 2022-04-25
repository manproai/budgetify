const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    transactionTitle: {
      type: String,
      trim: true,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Account category is required'],
    },
    transactionAmount: {
      type: Number,
      trim: true,
      default: 0,
    },
    transactionDescription: {
      type: String,
      trim: true,
    },
    transactionOperationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
  Transaction,
};
