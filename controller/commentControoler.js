const commentModel = require('../models/commentModel');

const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Util/appError');
const product=require('../models/product')

exports.Showcomments = catchAsync(async (req, res, next) => {
  const { ProductID } = req.params;
  if (!ProductID) {
    return next(new AppError('Request is not providing', 400));
  }
  const comments = await commentModel.find({ ProductID: ProductID });
  res.status(200).json({
    status: 'successful',
    comments,
  });
});

exports.createcomment = catchAsync(async (req, res, next) => {
  const { ProductID } = req.params;
  if (!ProductID) {
    return next(new AppError('Request is not providing the course id!', 400));
  }
  const createcomment = await commentModel.create({
    text: req.body.text,
    ProductID: ProductID,
    userID: req.user._id,
    replyOf: req.body.replyOf,
  });

  res.status(201).json({
    status: 'successful',
    createcomment,
  });
});
