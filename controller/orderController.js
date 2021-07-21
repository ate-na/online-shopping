const orderModel=require('../models/order')
const Product=require('../models/product')

const catchAsync = require('../Utill/catchAsync');
const AppError = require('../Util/appError');

exports.createOrder=catchAsync(async (req, res, next) => {
    const addProduct=Product.findById(req.body.id)
    .then(product=>{
        req.user.addToCart(product)
        .then(result=>{
            res.status(200).json({
                status: 'successful',
                addProduct
            })
        })
    })
})