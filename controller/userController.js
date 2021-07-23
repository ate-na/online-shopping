const userModel = require('../models/userModel');

const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Utill/appError');

exports.myProfile = catchAsync(async (req, res, next) => {
  console.log("user",req.user)
  res.status(200).json({
    status: 'Success',
    user: req.user,
  });
});

exports.editUseInfo = catchAsync(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("User Info didn't update! Please try again", 400));
  }

  res.status(200).json({
    status: 'Success',
    user,
  });
});

exports.otherProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await userModel.findOne({
    username,
  });
  if (!user) {
    return next(new AppError("User Doesn't Exist", 400));
  }

  res.status(200).json({
    status: 'Success',
    user,
  });
});