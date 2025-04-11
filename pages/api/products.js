import Connect from "@/lib/mongoose"; // Your MongoDB connection utility
import Product from "@/models/product"; // Product model
import Category from "@/models/categories";

export default async function handler(req, res) {
  const { method } = req;
  await Connect(); // Make sure you're connected to MongoDB

  if (method === "POST") {
    // Create a new product
    const { title, description, price, images, category } = req.body;
    const product = await Product.create({ title, description, price, images, category });
    res.json(product);
  }

  if (method === "GET") {
    if (req.query?.id) {
      // Get a single product by ID
      const product = await Product.findById(req.query.id).populate("category");
      res.json(product);
    } else {
      // Get all products and populate category
      const products = await Product.find()
        .populate("category") // Populate the category reference with data
        .sort({ price: 1 });
      res.json(products);
    }
  }

  if (method === "PUT") {
    // Update a product
    const { title, description, price, _id, images, category } = req.body;
    await Product.updateOne({ _id }, { title, description, price, images, category });
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      // Delete a product by ID
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
