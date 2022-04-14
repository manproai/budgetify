const { Category } = require('../models/categoryModel');
const { validateCategory } = require('../validation/validationCategory');

const createCategory = async (req, res, next) => {
  const { error } = await validateCategory.validate(req.body);
  if (error) {
    return next(new Error(error));
  }
  const { categoryName, categoryType } = req.body;

  const getAvailableCategory = await Category.findOne({ categoryName });

  if (getAvailableCategory) {
    return next(new Error(`${getAvailableCategory.categoryName} already exists.`));
  }

  try {
    const category = await Category.create({
      categoryName,
      categoryType,
    });

    res.status(201).json({
      categoryName: category.categoryName,
      categoryType: category.categoryType,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

const updateCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new Error('Not found record with this ID'));
  }
  const { categoryName } = req.body.categoryName;

  const getAvailableCategory = await Category.findOne(categoryName);

  if (!getAvailableCategory) {
    return next(new Error('User has invalid cridentials'));
  }

  const updatedCategory = await Category.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedCategory);
};

const deleteCategory = async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new Error('Not found record with this ID'));
  }

  await category.remove();
  res.status(200).send('Successfully deleted');
};

const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
