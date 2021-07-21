const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    OrderID:{
        type:String,
        required:true,
        unique:true   
    },
    DateofRegistration: {
        type: Date,
        required: true,
    },
    DeliveryDate:{
        type: Number,
        required: true,
    },
    Adress:{
        type:Boolean,
        required:true
    },
    wayoftransition:{
        type:String,
        required:true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;