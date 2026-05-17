import { prisma } from "../../../lib/prisma"

const createProduct = async (payload:any)=>{
    const result = await prisma.product.create({
        data:payload
    })
    return result
}
const getProducts = async ()=>{
    const result = await prisma.product.findMany()
    return result
}
const getSingleProduct = async (id: string)=>{
    const result = await prisma.product.findUnique({
        where: {
            id
        }
    })
    if(!result) {
        throw new Error("Product Not Found")
    }
    return result
}
const updateProduct = async (
    id: string,
    payload:any)=>{
    const result = await prisma.product.update({
        where: {
            id,
        },
        data: payload
    })
    return result
}
const deleteProduct = async (id: string)=>{
    const result = await prisma.product.delete({
        where: {
            id,
        },
    })
    return result
}

export const ProductService ={
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}