import { Router } from "express";
import { OrderController } from "./order.controller";

const router:Router = Router();

router.post("/", OrderController.createOrder);
router.get("/", OrderController.getOrders);
router.delete("/:id", OrderController.deleteOrder);
router.patch("/:id/approve", OrderController.approveOrder);

export const OrderRoutes = router;