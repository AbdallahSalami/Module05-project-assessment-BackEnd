import mongoose from "mongoose";
import Product from "../Models/ProductModel.js";

class ProductController {
  // Create a new product
  static createProduct = async (req, res) => {



    upload.array('images')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Multer error' });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }


    const { productName, price, description, status } = req.body;
    const images = req.files ;

    try {
      const product = await Product.create({
        productName,
        images,
        price,
        description,
        status,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

  static readProduct = async (req, res) => {
    try {
      const product = await Product.find();
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static readOneProduct = async (req, res) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static readOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateProduct = async (req, res) => {

    upload.array('images')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Multer error' });
        } else if (err) {
          return res.status(400).json({ error: err.message });
        }
    const { id } = req.params;
    const { productName, price, description, status } = req.body;
    const images = req.files ;

    try {
      const updateFields = {
        productName,
        images,
        price,
        description,
        status,
      };

      const product = await Product.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

  // Delete a product
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default ProductController;
