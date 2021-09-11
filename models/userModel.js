const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Product=require('../models/productModel')

// const UserRoles = {
//   SELLER: 'seller',
//   CUSTOMER: 'customer',
//   ADMIN: 'admin',
// };

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
  },
  sellerrequest: {
    type:Boolean,
    default:false
  },
  username:{
    type: String,
    lowercase: true,
    required: [true, 'Please Provide a Email'],
    unique: [true, 'This Email is not available'],
    index: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Please Provide a Email'],
    unique: [true, 'This Email is not available'],
    index: true,
  },
  role: {
    type: String,
    default: 'customer',
    enum: ["customer", "seller", "admin"]
   },
  birthdate:{
    type:Date,
  },
  age:{
      type:Number,
  },cart: {
    items: [{
        productId: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    totalPrice: Number
  }
},{timestamps:true});

userSchema.methods.addToCart = async function(productId) {
  const product = await Product.findById(productId);
  if (product) {
      const cart = this.cart;
      const isExisting = cart.items.findIndex(el => new String(el.productId).trim() === new String(product._id).trim());
      if (isExisting >= 0) {
          cart.items[isExisting].qty += 1;
      } else {
          cart.items.push({ productId: product._id, qty: 1 });
      }
      if (!cart.totalPrice) {
          cart.totalPrice = 0;
      }
      cart.totalPrice += product.price;
      return this.save();
  }
};

userSchema.methods.removeFromCart =async function(productId) {
  const cart = this.cart;
  const product = await Product.findById(productId);
  const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
  if (isExisting >= 0) {
    cart.totalPrice =0
      cart.items.splice(isExisting, 1);
      return this.save();
  }
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  if (!this.phoneNumber.startsWith('+98')) {
    this.phoneNumber = `+98${this.phoneNumber.slice(1)}`;
  }

  next();
});

userSchema.methods.checkPassword = async (userPass, enteredPass) => {
  return await bcrypt.compare(enteredPass, userPass);
};


const User = mongoose.model("User", userSchema);
module.exports = User;

