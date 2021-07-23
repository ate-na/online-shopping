const orderModel=require('../models/orderModel')
const Product=require('../models/productModel')
const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Utill/appError');
exports.addToCart = (req, res, next) => {
    req.user.addToCart(req.body.ProductID)
        .then(() => {
            res.status(200).json({
                status: 'Success',
            })
        }).catch(err => console.log(err));
}

exports.deleteInCart = (req, res, next) => {
    req.user.removeFromCart(req.body.ProductID)
        .then(() => {
            res.status(200).json({
                status: 'Success',
            })
        }).catch(err => console.log(err));
}
exports.createOrder = catchAsync(async (req, res, next) =>{
    let newOrder=new orderModel({
        DateofRegistration:req.body.DateofRegistration,
        DeliveryDate:req.body.DeliveryDate,
        Adress:req.body.Adress,
        wayoftransition:req.body.wayoftransition,
        userID:req.user._id
    })
    newOrder.save()
    res.status(201).json({
        status: 'successful',
        newOrder,
      });
})
exports.deleteOrder=catchAsync(async (req, res, next)=>{
    let {OrderID}=req.params
    if(!OrderID){
        return next(new AppError('can not find', 400));
    }
    const deleteOrder=await orderModel.findByIdAndRemove(OrderID)
    res.status(200).json({
        status: 'successful'
      });
})

