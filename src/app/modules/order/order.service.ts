import { prisma } from "../../../lib/prisma";

const createOrder = async (
  userId: string,
  payload: {
    products: {
      productId: string;
      quantity: number;
    }[];
  },
) => {
  const order = await prisma.order.create({
    data: {
      userId,
      orderItems: {
        create: payload.products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      orderItems: true,
    },
  });
  return order;
};

const getOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      orderItems: true,
      user: true,
    },
  });
  return result;
};

const deleteOrder = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== userId) {
    throw new Error("Unauthorized");
  }
  if (order.status === "APPROVED") {
    throw new Error("Approved Order can not be deleted");
  }

  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  return {
    message: "Order deleted successfully",
  };
};

const approveOrder = async (orderId: string) => {
  const result = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "APPROVED",
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
  deleteOrder,
  approveOrder,
};
