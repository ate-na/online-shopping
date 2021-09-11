const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    DateofRegistration: {
        type: Date,
    },
    DeliveryDate:{
        type: String,
    },
    Adress:{
        type:String,
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