const Product = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const AppError = require("../Util/appError");
const catchAsync = require("../Util/catchAsync");
const SELECTS = require("../Util/handlefind");
const APIFeatures = require("../Util/apiFeatures");
exports.getAllproducts = async (req, res, next) => {
  const select = SELECTS + " -OrderID";
  const features = new APIFeatures(Product.find().select(select), req.query);

  const ProductALL = await features.query;

  res.status(200).json({
    status: "Success",
    products: ProductALL,
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
      status: "successful",
      product,
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
  const findcategory = await categoryModel
    .findById(categoryID)
    .select("+countProduct");
  //   console.log(findcategory)
  const category = await categoryModel.findByIdAndUpdate(
    categoryID,
    { countProduct: findcategory.countProduct + 1 },
    {
      runValidators: true,
    }
  );
  const categorytitle = category.title;
  console.log(req.body);
  console.log(req.file);
  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    Exitence: req.body.Exitence,
    description: req.body.description,
    OrderID: OrderID,
    picture: req.file.picture,
  });
  if (req.file) {
    newProduct.picture = req.file.picture;
  }
  newProduct.save();
  const name = newProduct.name;
  const price = newProduct.price;
  const description = newProduct.description;
  res.status(201).json({
    status: "successful",
    name,
    price,
    description,
    categorytitle,
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
    const productId = req.params.productId;
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
