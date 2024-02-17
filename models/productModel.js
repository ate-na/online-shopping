const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    Exitence: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    categoryID: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    OrderID: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },
    picture: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", ProductSchema);

module.exports = product;
