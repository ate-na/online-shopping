const Category = require("../models/categoryModel");
const CategoryModels = require("../models/categoryModel");
const AppError = require("../Util/appError");
const catchAsync = require("../Util/catchAsync");

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ title: req.body.title });

  if (category) {
    return res.status(402).json({
      message: "this category already exist",
    });
  }
  console.log(req.file);
  const NewCategory = await CategoryModels.create({
    title: req.body.title,
    countProduct: req.body?.countProduct || 0,
    picture: req.file.filename,
  });
  res.status(201).json({
    message: "successful",
    data: NewCategory,
  });
});

exports.getAllCategories = catchAsync(async (req, res, nex) => {
  const categories = await Category.find();
  res.status(201).json({
    status: "successful",
    data: categories,
  });
});

exports.getcategory = catchAsync(async (req, res, next) => {
  let categoryID = req.params.categoryID;
  const category = await CategoryModels.findById(categoryID);
  const title = category.title ? category.title : "";
  const countProduct = category.countProduct ? category.countProduct : 0;
  if (!category) {
    return next(new AppError("Request is not providing", 400));
  } else {
    res.status(201).json({
      status: "successful",
      title,
      countProduct,
    });
  }
});
