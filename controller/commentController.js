const commentModel = require('../models/commentModel');

const catchAsync = require('../Util/catchAsync');
const AppError = require('../Util/appError');

exports.Showcomments = catchAsync(async (req, res, next) => {
  const  ProductID  = req.params.ProductID;
  // const  ProductID  = req.body.productID;
  if (!ProductID) {
    return next(new AppError('Request is not providing', 400));
  }
  const comments = await commentModel.find({ productID: ProductID }).select('text -_id');
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
const text=createcomment.text
  res.status(201).json({
    status: 'successful',
    text,
  });
});
