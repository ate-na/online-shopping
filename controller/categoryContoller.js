const CategoryModels = require('../models/categoryModel');
const AppError = require('../Utill/appError');
const catchAsync = require('../Utill/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
  const NewCategory = await CategoryModels.create({
    title: req.body.title,
    countProduct: req.body.countProduct,
  });
  res.status(201).json({
    status: 'successful',
    NewCategory,
  });
});

exports.getcategory = catchAsync(async (req, res, next) => {
  let categoryID=req.params.categoryID;
  const category = await CategoryModels.findById(categoryID);
  if(!category){
    return next(new AppError('Request is not providing', 400));
  }else{
      res.status(201).json({
          status: 'successful',
          category,
        });
    }
});
