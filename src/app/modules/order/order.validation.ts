import z from "zod";

export const createOrderValidateSchema = z.object({
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    }),
  ),
});
