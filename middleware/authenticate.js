const jwt=require('jsonwebtoken')
const UserModel = require('../models/userModel')

exports.authenticate=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        const decode=jwt.verify(token, 'verySecretValue')

        // const user =  UserModel.findById(decode.id);
        req.user=decode
        console.log(decode)
        next()
    }catch(error){
        res.json({
            message:'Authentication Failed!'
        })
        
    }
    console.log("token")
}
// const catchAsync = require('../Utill/catchAsync');
// const AppError = require('../Utill/appError');
// const {promisify}=require('util')

// const { JWT_SECERT, JWT_EXPIRES_IN } = process.env;

// exports.authenticate = catchAsync(async (req, res, next) => {
//     // Get Token
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith('Bearer')
//     ) {
//       token = req.headers.authorization.split(' ')[1];
//     }
  
//     if (!token) {
//       return next(
//         new AppError('You are not logged in! Please log in to get access.', 401)
//       );
//     }
  
//     // Verification token
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECERT);
  
//     // Check if user still exists
//     const user = await UserModel.findById(decoded.id);
  
//     if (!user) {
//       return next(
//         new AppError(
//           'The user belonging to this token does no longer exist.',
//           401
//         )
//       );
//     }
  
//     // GRANT ACCESS TO PROTECTED ROUTE
//     req.user = user;
//     next();
//   });