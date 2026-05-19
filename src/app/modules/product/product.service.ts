import { prisma } from "../../../lib/prisma";
import { Product } from "./product.model";

// const createProduct = async (payload:any)=>{
//     const result = await prisma.product.create({
//         data:payload
//     })
//     return result
// }
// const getProducts = async ()=>{
//     const result = await prisma.product.findMany()
//     return result
// }
// const getSingleProduct = async (id: string)=>{
//     const result = await prisma.product.findUnique({
//         where: {
//             id
//         }
//     })
//     if(!result) {
//         throw new Error("Product Not Found")
//     }
//     return result
// }
// const updateProduct = async (
//     id: string,
//     payload:any)=>{
//     const result = await prisma.product.update({
//         where: {
//             id,
//         },
//         data: payload
//     })
//     return result
// }
// const deleteProduct = async (id: string)=>{
//     const result = await prisma.product.delete({
//         where: {
//             id,
//         },
//     })
//     return result
// }

const createProduct = async (payload: {
  title: string;
  description: string;
  price: number;
  stock: number;
}) => {
  const product = await Product.create(payload);

  return product;
};

const getAllProducts = async () => {
  const products = await Product.find();

  return products;
};

const getSingleProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const updateProduct = async (
  id: string,
  payload: Partial<{
    title: string;
    description: string;
    price: number;
    stock: number;
  }>,
) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

const deleteProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new Error("Product not found");
  }

  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
