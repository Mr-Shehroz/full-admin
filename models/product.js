import mongoose from "mongoose";

// Product schema
const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String], // store image URLs
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Make sure this matches the Category model name
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
