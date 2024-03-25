const Product = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const AppError = require("../Util/appError");
const catchAsync = require("../Util/catchAsync");
const SELECTS = require("../Util/handlefind");
const APIFeatures = require("../Util/apiFeatures");
const product = require("../models/productModel");
exports.getAllproducts = async (req, res, next) => {
  const select = SELECTS + " -OrderID";
  const features = new APIFeatures(
    Product.find().populate("categoryID"),
    req.query
  );

  const ProductALL = await features.query;

  res.status(200).json({
    message: "Success",
    data: ProductALL,
  });
};

exports.getproduct = catchAsync(async (req, res, next) => {
  let { ProductID } = req.params;
  if (!ProductID) {
    return next(new AppError("ProductID can not be null", 400));
  }
  const select = SELECTS + " -OrderID";
  console.log("select", select);
  const product = await Product.findById(ProductID).select(select);
  if (!product) {
    return next(new AppError("Product not found", 400));
  } else {
    res.status(200).json({
      message: "successful",
      data: product,
    });
  }
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { categoryID, OrderID } = req.body;
  if (!categoryID) {
    res.status(400).json({
      message: "Please provide a category",
    });
  }
  console.log("files", req.files);
  const findcategory = await categoryModel.findById(categoryID);

  //   console.log(findcategory)
  const category = await categoryModel.findByIdAndUpdate(
    categoryID,
    { countProduct: findcategory.countProduct + 1 },
    {
      runValidators: true,
    }
  );

  let newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    Exitence: req.body.Exitence,
    description: req.body.description,
    OrderID: OrderID,
    picture: req.files,
    categoryID,
  });
  console.log(req.file);
  if (req.files) {
    newProduct.picture = req.files;
  }
  await newProduct.save();
  console.log(findcategory);
  newProduct.category = findcategory;

  res.status(201).json({
    message: "successfuly",
    data: newProduct,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  let ProductID = req.body.ProductID;
  if (!ProductID) {
    return next(new AppError("can not find", 400));
  }
  const deleteProduct = await Product.findByIdAndRemove(ProductID).select(
    "name -_id"
  );
  res.status(200).json({
    status: "successful",
    deleteProduct,
  });
});

exports.updateProduct = async (req, res, next) => {
  try {
    const update = req.body;
    console.log("update", update);
    const productId = req.params.productId;
    console.log("req files", req.files);
    if (req.files && req.files.length > 0) {
      update["picture"] = req.files;
    }
    await Product.findByIdAndUpdate(productId, update);
    const productupdate = await Product.findById(productId);
    res.status(200).json({
      data: productupdate,
      message: "product has been updated",
    });
  } catch (error) {
    next(error);
  }
};
