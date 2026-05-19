import mongoose, { Schema } from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },

    orderItems: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model(
  "Order",
  orderSchema
);