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
    required: true,
    validate: validator.isEmail,
  },
//   role: {
//     type: String,
//     enum: UserRoles,
//     default: UserRoles.CUSTOMER,
//   },
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


const User = mongoose.model("User", userSchema);
module.exports = User;
// module.exports.UserRoles = UserRoles;
