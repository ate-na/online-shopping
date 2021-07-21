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
    let ProductID=req.body.ProductID
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
    const { categoryID } = req.body;
  if (!categoryID) {
    res.status(400).json({
        message:'Please provide a category'
    })
  }
    let newProduct=new Product({
        name:req.body.name,
        price:req.body.price,
        Exitence:req.body.Exitence,
        description:req.body.description,
        // picture:req.body.picture   
    })
    if(req.file){
        let path=''
        req.files.forEach(function(files,index,arr){
            path=path+files.path+','
        })
        path=path.substring(0,path.lastIndexOf(","))
        Product.avator=path
    }
    newProduct.save()
    res.status(201).json({
        status: 'successful',
        newProduct,
      });
})

exports.updateProduct=catchAsync(async (req, res, next)=>{
    let ProductID=req.body.ProductID
    let updateData={
        name:req.body.name,
        price:req.body.price,
        Exitence:req.body.Exitence,
        description:req.body.description,
    }
const newProduct=await Product.findByIdAndUpdate(ProductID,{$set:updateData})
    if(!newProduct){
    return next(new AppError('prudct did not updated', 400));
    }
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

