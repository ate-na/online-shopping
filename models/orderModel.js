const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    DateofRegistration: {
        type: Date,
        required: true,
    },
    DeliveryDate:{
        type: String,
        required: true,
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
// OrderSchema.index({ OrderID: 1}, { unique: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;