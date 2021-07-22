const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Utill/appError');
const UserModel = require('../models/userModel');


const { JWT_SECERT, JWT_EXPIRES_IN } = process.env;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECERT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createNsendToken = (user, statuscode, res) => {
  const token = createToken(user._id);

  user.password = undefined;
  const userName = user.username;
  return res.status(statuscode).json({
    status: 'Success',
    token,
    user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
    console.log("ddddd");
    const user = await UserModel.create({
    Name:req.body.Name,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    birthdate:req.body.birthdate,
    age:req.body.age,
    username: req.body.username,
    password:req.body.password    
  });
  createNsendToken(user, 200, res);
});

exports.logIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // Check the inputs
  if (!username || !password) {
    return next(new AppError('Please provide your username and password', 400));
  }

  // Check if user Exists
  const user = await UserModel.findOne({
    username,
  }).select('+password');

  if (!user || !(await user.checkPassword(user.password, password))) {
    return next(new AppError('Incorrect Login Credentials', 401));
  }
  createNsendToken(user, 200, res);
});

exports.authenticate = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERT);

  const user = await UserModel.findById(decoded.id);

  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  req.user = user;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  // Get user
  const user = await UserModel.findById(req.user._id).select('+password');

  // Checking POSTed password
  if (!(await user.checkPassword(user.password, oldPassword))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // Everything is OK
  user.password = newPassword;
  await user.save();

  // Log user in, send jwt
  createNsendToken(user, 200, res);
});

// exports.restrictTo = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('You do not have permission to perform this action', 403)
//       );
//     }

//     next();
//   };
// };
//code 
// const User=require('../models/userModel')
// const bcrypt=require('bcryptjs')
// const jwt =require('jsonwebtoken')


// exports.register=(req,res,next)=>{
//     bcrypt.hash(req.body.password,10,function(err,hashPass){
//         if(err){
//             res.json({error:err})
//         }
//         let user=new User({
//             Name:req.body.Name,
//             email:req.body.email,
//             phoneNumber:req.body.phoneNumber,
//             birthdate:req.body.birthdate,
//             age:req.body.age,
//             password:hashPass,

//         })
//         user.save()
//         .then(user=>{
//             res.json({
//                 message:'User add successfully'
//             })
//         }).catch(error=>{
//             res.json({
//                 message:error
//             })
//         })
//     })
    
// }

// exports.Login=(req,res,next)=>{
//     var username=req.body.username
//     var password=req.body.password
    
//     User.findOne({$or:[{email:username},{phone:username}]})
//     .then(user=>{
//         console.log(user)
//         if(user){
//                 bcrypt.compare(password,user.password,function(err,result){

//                     if(err){
//                         res.json({
//                             error:err
//                         })
//                     }if(result){
//                         let token=jwt.sign({name:user.name}, 'verySecretValue' ,{expiresIn:'1h'})
//                         res.json({
//                             message:'Lgin suucessfully',
//                             token
//                         })
//                     }else{
//                         res.json({
//                             message:'Password dose not match'
//                         })
//                     }
//                 })
//         }else{
//             res.json({
//                 message:'No user found'
//             })
//         }
//     })


    
// }
