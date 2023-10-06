const userModel = require("../models/userModel");
const SELECTS = require("../Util/handlefind");
const catchAsync = require("../Util/catchAsync");
const AppError = require("../Util/appError");
const User = require("../models/userModel");

exports.myProfile = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    user: req.user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "Success",
    user: users,
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
    status: "Success",
    user,
  });
});
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

exports.requestSellerRole = catchAsync(async (req, res, next) => {
  const { username } = req.body;
  const select = SELECTS + " -password";
  const user = await userModel
    .findOneAndUpdate(
      {
        username: username,
        role: "customer",
      },
      {
        sellerrequest: true,
      },
      { new: true }
    )
    .select(select);
  if (!user) {
    return next(new AppError("User Doesn't Exist", 400));
  }
  res.status(200).json({
    status: "Success",
    user,
  });
});

exports.getSellerRequests = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("You Do not have permission", 400));
  }
  let users = await userModel.find({ sellerrequest: true }, "username");

  res.status(200).json({
    status: "Success",
    users,
  });
});
exports.acceptSellerRequest = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("You Do not have permission", 400));
  }
  const { username } = req.body;
  const user = await userModel.findOne({
    username: username,
  });
  if (user.role === "customer") {
    user.role = "seller";
    user.sellerrequest = false;
    user.save();
    return res.status(200).json({
      status: "Success",
      user,
    });
  } else if (user.role === "seller") {
    return res.status(200).json({
      status: "Success",
      message: "You are already a Seller!",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "You Are an Admin!",
    });
  }
});

exports.declineSellerRequest = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new AppError("You Do not have permission", 400));
  }
  const { username } = req.body;
  const user = await userModel.findOne(
    {
      username: username,
    },
    "username"
  );
  user.sellerrequest = false;
  user.save();
  return res.status(200).json({
    status: "Success",
    message: "Your Request has been declined!",
    user,
  });
});
