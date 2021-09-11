const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    Exitence:{
        type:Boolean,
        default:true
    },
    description: {
        type: String
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    OrderID: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default:null
    },
    picture: {
        type: String,
    },
}, {
    timestamps: true
});

ProductSchema.index({ ProductID: 1}, { unique: true });
const product = mongoose.model('Product', ProductSchema);

module.exports = product;