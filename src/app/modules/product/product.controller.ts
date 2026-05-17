import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  const result = await ProductService.createProduct(req.body);
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: result,
  });
};
const getProducts = async (req: Request, res: Response) => {
  const result = await ProductService.getProducts();
  res.status(201).json({
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
};
const getSingleProduct = async (req: Request, res: Response) => {
  const result = await ProductService.getSingleProduct(req.params.id as string);
  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
};
const updateProduct = async (req: Request, res: Response) => {
  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: result,
  });
};
const deleteProduct = async (req: Request, res: Response) => {
  const result = await ProductService.deleteProduct(req.params.id as string);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
};

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
