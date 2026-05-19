import { prisma } from "../../../lib/prisma";
import { Order, OrderStatus } from "./order.model";

// const createOrder = async (
//   userId: string,
//   payload: {
//     products: {
//       productId: string;
//       quantity: number;
//     }[];
//   },
// ) => {
//   const order = await prisma.order.create({
//     data: {
//       userId,
//       orderItems: {
//         create: payload.products.map((item) => ({
//           productId: item.productId,
//           quantity: item.quantity,
//         })),
//       },
//     },
//     include: {
//       orderItems: true,
//     },
//   });
//   return order;
// };

// const getOrders = async () => {
//   const result = await prisma.order.findMany({
//     include: {
//       orderItems: true,
//       user: true,
//     },
//   });
//   return result;
// };

// const deleteOrder = async (orderId: string, userId: string) => {
//   const order = await prisma.order.findUnique({
//     where: {
//       id: orderId,
//     },
//   });
//   if (!order) {
//     throw new Error("Order not found");
//   }
//   if (order.userId !== userId) {
//     throw new Error("Unauthorized");
//   }
//   if (order.status === "APPROVED") {
//     throw new Error("Approved Order can not be deleted");
//   }

//   await prisma.order.delete({
//     where: {
//       id: orderId,
//     },
//   });
//   return {
//     message: "Order deleted successfully",
//   };
// };

// const approveOrder = async (orderId: string) => {
//   const result = await prisma.order.update({
//     where: {
//       id: orderId,
//     },
//     data: {
//       status: "APPROVED",
//     },
//   });
//   return result;
// };

const createOrder = async (payload: {
  user: string;
  orderItems: {
    product: string;
    quantity: number;
  }[];
}) => {
  const order = await Order.create({
    user: payload.user,
    orderItems: payload.orderItems,
    status: OrderStatus.PENDING,
  });

  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("user")
    .populate("orderItems.product");

  return orders;
};

const approveOrder = async (id: string) => {
  const order = await Order.findByIdAndUpdate(
    id,
    {
      status: "APPROVED",
    },
    {
      new: true,
    }
  );

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const deleteOrder = async (
  orderId: string,
  userId: string
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.user.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  if (order.status === "APPROVED") {
    throw new Error(
      "Approved order cannot be deleted"
    );
  }

  await Order.findByIdAndDelete(orderId);

  return null;
};
export const OrderService = {
  createOrder,
  getAllOrders,
  deleteOrder,
  approveOrder,
};
