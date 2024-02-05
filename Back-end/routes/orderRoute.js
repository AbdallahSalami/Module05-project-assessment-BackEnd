import express from "express";
import OrderController from "../Controllers/OrderController.js";
import { authenticate,AdminRole} from "../middleware/auth.js";
const orderRouter = express.Router();

orderRouter.post("/",OrderController.createOrder);
orderRouter.get("/",authenticate, OrderController.readOrder);
orderRouter.get("/:id",OrderController.readOneOrder);
orderRouter.patch("/:id",OrderController.updateOrder);
orderRouter.delete("/:id",OrderController.deleteOrder);

export default orderRouter;