const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const catchAsync = require("../Util/catchAsync");
const AppError = require("../Util/appError");
const UserModel = require("../models/userModel");
const { roles } = require("../role");

const createToken = (id) => {
  console.log("process.env.JWT_SECERT", process.env.JWT_SECERT, id);
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createNsendToken = (user, statuscode, res) => {
  console.log("createNsendToken");
  const token = createToken(user?._id);

  user.password = undefined;
  const userName = user.username;
  const email = user.email;
  return res.status(statuscode).json({
    status: "Success",
    token,
    userName,
    email,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  console.log("signUp");
  console.log(req.body);

  const isAlreadyExist = await UserModel.findOne({ email: req.body.email });

  console.log(isAlreadyExist);

  if (isAlreadyExist) {
    return res
      .status(402)
      .json({ message: "This User Already Exist", status: 402 });
  }

  if (req.body.password.length < 8) {
    return res.status(402).json({ message: "password is week", status: 402 });
  }
  try {
    const user = await UserModel.create({
      Name: req.body.Name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthdate: req.body.birthdate,
      age: req.body.age,
      role: req.body.role,
      username: req.body.username,
      password: req.body.password,
    });

    createNsendToken(user, 200, res);
  } catch (error) {
    console.log("error", error);
  }
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  console.log("body is", req.body);
  // Check the inputs
  if (!username || !password) {
    // return next(new AppError("Please provide your username and password", 400));
    return res.status(400).json({
      message: "Please provide your username and password",
      status: 400,
    });
  }

  // Check if user Exists
  const user = await UserModel.findOne({
    username,
  }).select("+password");

  if (!user || !(await user.checkPassword(user.password, password))) {
    // return next(new AppError("Incorrect Login Credentials", 401));
    return res.status(401).json({
      message: "Incorrect Login Credentials",
      status: 401,
    });
  }
  createNsendToken(user, 200, res);
});

exports.authenticate = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    // return next(
    //   // new AppError("You are not logged in! Please log in to get access.", 401)
    // );
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access.",
      status: 401,
    });
  }

  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERT);

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    res.status(401).json({
      message: "The user belonging to this token does no longer exist.",
      status: 401,
    });
  }

  req.user = user;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { newPassword } = req.body;

  // Get user
  console.log("user is", req.user);
  const user = await UserModel.findById(req.user._id).select("+password");

  // Everything is OK
  user.password = newPassword;
  await user.save();

  // Log user in, send jwt
  createNsendToken(user, 200, res);
});

exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user?.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
