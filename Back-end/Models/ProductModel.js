// Product Model (product.model.js)
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
      required: true,
    },
  price: {
    type: Number,
    required: true,
  },  

  description: {
    type: String,
    required: true,
  },  
  images:  {
    type: String,
    required: true,
    },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending", "New"],
    default: "Accepted",
    required: true,
  },
  },
  {
    timestamps: false
  },
)



  const Product = mongoose.model("products", productSchema);




export default Product;
