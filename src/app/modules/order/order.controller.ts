import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {

  const userId = req.body.userId;

  const result = await OrderService.createOrder(
    userId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: result,
  });
};

const getOrders = async (
  req: Request,
  res: Response
): Promise<void> => {

  const result = await OrderService.getOrders();

  res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
};

const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {

  const userId = req.body.userId;

  const result = await OrderService.deleteOrder(
    req.params.id as string,
    userId
  );

  res.status(200).json({
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
};

const approveOrder = async (
  req: Request,
  res: Response
): Promise<void> => {

  const result = await OrderService.approveOrder(
    req.params.id as string
  );

  res.status(200).json({
    success: true,
    message: "Order approved successfully",
    data: result,
  });
};

export const OrderController = {
  createOrder,
  getOrders,
  deleteOrder,
  approveOrder,
};