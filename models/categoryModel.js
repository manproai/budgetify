const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'Category name is required'],
    },
    categoryType: {
      type: String,
      enum: ['income', 'expense'],
      required: [true, 'Account Currency is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = {
  Category,
};
