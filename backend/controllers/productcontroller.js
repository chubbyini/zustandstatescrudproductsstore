import Product from "../models/product.model.js";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// POST create a new product
export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product || !product.name || !product.price || !product.image) {
    return res.status(400).send("Product data is required");
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully!", data: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    return res
      .status(500)
      .send({ success: false, message: "Failed to create product" });
  }
};

// PUT update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  console.log("Updating product:", id, updatedData);

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return res.status(400).json({ message: "No update data provided" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { returnDocument: "after", runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("Updated product:", updatedProduct);
    res
      .status(200)
      .json({ message: "Product updated successfully!", data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
};
