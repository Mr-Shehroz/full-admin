import dbConnect from "@/lib/mongoose";
import Category from "@/models/categories";

export default async function handler(req, res) {
  await dbConnect();
  

  const { method, query } = req;

  if (method === "POST") {
    const { categoryName, parentCategory, properties } = req.body;

    if (!categoryName || categoryName.trim() === "") {
      res.status(400).json({ error: "Category name is required" });
      return;
    }

    if (properties && Array.isArray(properties)) {
      // Ensure properties are well-formed
      const validProperties = properties.filter(p => p.name && p.value);
      if (validProperties.length === 0) {
        res.status(400).json({ error: "At least one property with name and value is required" });
        return;
      }
    }

    try {
      const category = await Category.create({
        categoryName,
        parent: parentCategory || undefined,
        properties: properties || [], // Ensure empty array if no properties
      });
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: "Error creating category" });
    }
  } else if (method === "GET") {
    try {
      // Populate parent category to get the parent category name
      const categories = await Category.find()
        .populate("parent", "categoryName") // Populate the 'parent' field with 'categoryName'
        .sort({ createdAt: -1 });

      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: "Error fetching categories" });
    }
  } else if (method === "DELETE") {
    const { id } = query;

    if (!id) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    try {
      await Category.findByIdAndDelete(id);
      res.status(204).end(); // No content
    } catch (err) {
      res.status(500).json({ error: "Error deleting category" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
