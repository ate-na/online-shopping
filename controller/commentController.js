const commentModel = require('../models/commentModel');

const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Utill/appError');

exports.Showcomments = catchAsync(async (req, res, next) => {
  const  ProductID  = req.params.ProductID;
  // const  ProductID  = req.body.productID;
  if (!ProductID) {
    return next(new AppError('Request is not providing', 400));
  }
  const comments = await commentModel.find({ productID: ProductID });
  res.status(200).json({
    status: 'successful',
    comments,
  });
});

exports.createcomment = catchAsync(async (req, res, next) => {
  // const { ProductID } = req.params;
  const  ProductID = req.body.productID
  console.log("ProductID",ProductID)
  if (!ProductID) {
    return next(new AppError('Request is not providing the Product id!', 400));
  }
  const createcomment = await commentModel.create({
    text: req.body.text,
    productID: ProductID,
    userID: req.user._id,
    replyOf: req.body.replyOf,
  });

  res.status(201).json({
    status: 'successful',
    createcomment,
  });
});
