const mongoose = require("mongoose");
const Schema=mongoose.Schema
const categorySchema =new Schema({
    categoryID:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    countProduct:{
        type:String
    }
},{
    timestamps:true
})


const  Category= mongoose.model("Category", categorySchema);
module.exports = Category;
