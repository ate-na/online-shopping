const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const Schema = mongoose.Schema;
const UserRoles = {
  CUSTOMER: "customer",
  ADMIN: "admin",
};

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
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
    required: true,
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
    enum: UserRoles,
    default: UserRoles.CUSTOMER,
  },
  birthdate:{
    type:Date,
  },
  age:{
      type:Number,
      required:true
  },Cart:{
      item:[{
          productID:{
              type:mongoose.Types.ObjectId,
              ref:'Product',
              required:true
          },
          qty:{
              type:Number,
                required:true

          }
      }],
      totalPrice:{
          type:Number
      }
  }
},{timestamps:true});

userSchema.methods.addToCart=function(product){
    let cart=this.cart
    if(cart.item.length==-1){
        cart.item.push({ProductID:product._id, qty:1})
        cart.totalPrice=product.price
    }else{
        const isExtance=cart.item.findIndex(obj=>{
            new String(obj.productID).trim()==new String(product._id).trim()
        })
        if(isExtance==-1){
            cart.item.push({ProductID:product._id, qty:1})
            cart.totalPrice=product.price
        }else{
            exitingProuductInCart=cart.items[isExtance]
            exitingProuductInCart.qty +=1;
            cart.totalPrice +=product.price;
        }
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

// Checks if entered password is correct or not (userPass => hashed password in DB)
userSchema.methods.checkPassword = async (userPass, enteredPass) => {
  return await bcrypt.compare(enteredPass, userPass);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports.UserRoles = UserRoles;
