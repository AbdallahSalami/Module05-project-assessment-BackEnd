import mongoose from "mongoose";
import Order from "../Models/OrderModel.js";

export default class OrderController {
  static createOrder = async (req, res) => {
    const { userId, products, totalPrice } = req.body;

    try {
      const order = await Order.create({
        userId,
        products,
        totalPrice,
        date: new Date(),
      });
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ ...error });
    }
  };

  static readOrder = async (req, res) => {
    try {
      const order = await Order.find()
        .populate("userId")
        .populate("products.product");
        
      if (order.length === 0) {
        res.status(404).json({ message: "No Order in The Database" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: { ...error }, err: error.message });
    }
  };

  static readOneOrder = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const order = await Order.findById(id)
        .populate("userId")
        .populate("products.product");

      if (!order) {
        return res
          .status(404)
          .json({ message: "No Order With This ID in The Database" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateOrder = async (req, res) => {
    const { id } = req.params;
    const { orderNumber, userId, products, totalPrice, date, status } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const updateFields = {
        orderNumber,
        userId,
        products,
        totalPrice,
        date,
        status,
      };
      const order = await Order.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!order) {
        return res
          .status(404)
          .json({ message: "No Order With This ID in The Database" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static deleteOrder = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
        return res
          .status(404)
          .json({ message: "No Order With This ID in The Database" });
      }
      res.status(200).json({ message: "order deleted succefully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
