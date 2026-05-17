import { Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateSchema";
import { loginValidationSchema, userValidationSchema } from "./auth.validation";

const router:Router = Router();

router.post("/login", validateRequest(loginValidationSchema) ,AuthController.login);
router.post("/register",validateRequest(userValidationSchema), AuthController.register);

export const AuthRoutes = router;