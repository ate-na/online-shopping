const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    ProductID:{
        type:String,  
    },
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
        required:true
    },
    description: {
        type: String
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    picture: {
        type: String,
    },
}, {
    timestamps: true
});

const product = mongoose.model('Product', ProductSchema);

module.exports = product;