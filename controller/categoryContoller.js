const Category = require("../models/categoryModel");
const CategoryModels = require("../models/categoryModel");
const productModel = require("../models/productModel");
const AppError = require("../Util/appError");
const catchAsync = require("../Util/catchAsync");

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ title: req.body.title });

  if (category) {
    return res.status(402).json({
      message: "this category already exist",
    });
  }
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

exports.updateCategory = catchAsync(async (req, res, next) => {
  let categoryID = req.params.categoryID;

  const category = await CategoryModels.findById(categoryID);
  if (!category || !categoryID) {
    throw new Error("category id is not valid");
    return;
  }

  console.log("body", req.body);

  if (req.body.title) {
    const checkTitle = await CategoryModels.findOne({
      title: req.body.title,
      _id: { $ne: categoryID },
    });
    console.log("checkTitle", checkTitle);
    if (checkTitle) {
      throw new Error("invalid name");
    }
    category.title = req.body.title;
  }

  if (req?.file?.filename) {
    category.picture = req.file.filename;
  }

  await category.save();
  res.status(201).json({
    status: "successful",
    data: category,
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
      data: category,
    });
  }
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  let categoryID = req.body.categoryID;
  if (!categoryID) {
    return next(new AppError("can not find", 400));
  }
  const products = await productModel.find({ categoryID: categoryID });
  if (products && products.length > 0) {
    return next(
      new AppError("this category has product please delete them first", 400)
    );
  }
  const deletedCategory = await CategoryModels.findByIdAndRemove(categoryID);
  res.status(200).json({
    status: "successful",
    data: deletedCategory,
  });
});
