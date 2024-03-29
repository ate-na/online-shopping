const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    countProduct: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
