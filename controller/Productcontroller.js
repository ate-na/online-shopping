const Product=require('../models/productModel');

const AppError = require('../Utill/appError');
const catchAsync = require('../Utill/catchAsync');

exports.getAllproducts=(req, res, next)=>{
    const Allproduct=Product.find()
        res.status(200).json({
            status: 'successful',
            Allproduct,
          });
}

exports.getproduct=catchAsync(async (req, res, next)=>{
    let {ProductID}=req.params
    if(!ProductID){
        return next(new AppError('ProductID can not be null', 400));
    }
    console.log(ProductID)
    const product=await Product.findById(ProductID)
    if(!product){
        return next(new AppError('Product not found', 400));
    }else{
        res.status(200).json({
            status: 'successful',
            product,
        });
    }
})

exports.createProduct=catchAsync(async (req, res, next)=>{
const { categoryID,OrderID } = req.body;
  if (!categoryID ) {
    res.status(400).json({
        message:'Please provide a category'
    })
  }
    let newProduct=new Product({
        name:req.body.name,
        price:req.body.price,
        Exitence:req.body.Exitence,
        description:req.body.description,
        OrderID:OrderID,
        picture:req.file.picture  
    })
    if(req.file){
        newProduct.picture=req.file.picture
    }
    newProduct.save()
    res.status(201).json({
        status: 'successful',
        newProduct,
      });
})

exports.deleteProduct=catchAsync(async (req, res, next)=>{
    let ProductID=req.body.ProductID
    if(!ProductID){
        return next(new AppError('can not find', 400));
    }
    const deleteProduct=await Product.findByIdAndRemove(ProductID)
    res.status(200).json({
        status: 'successful',
        deleteProduct,
      });
})

