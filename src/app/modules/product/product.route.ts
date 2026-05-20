import { Router } from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middleware/validateSchema";
import { productValidationSchema } from "./product.validation";

const router: Router = Router();

// router.post("/",validateRequest(productValidationSchema), ProductController.createProduct);
// router.get("/",validateRequest(productValidationSchema), ProductController.getProducts);
// router.get("/:id",validateRequest(productValidationSchema), ProductController.getSingleProduct);
// router.patch("/:id",validateRequest(productValidationSchema), ProductController.updateProduct);
// router.delete("/:id",validateRequest(productValidationSchema), ProductController.deleteProduct);

router.post(
  "/create-product",ProductController.createProduct);

router.get(
  "/",
  ProductController.getProducts
);

router.get(
  "/:id",
  ProductController.getSingleProduct
);

router.patch(
  "/:id",
  ProductController.updateProduct
);

router.delete(
  "/:id",
  ProductController.deleteProduct
);

export const ProductRoutes = router;
