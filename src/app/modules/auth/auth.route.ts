import { Request, Response, Router } from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateSchema";
import { loginValidationSchema, userValidationSchema } from "./auth.validation";

const router:Router = Router();

// router.post("/login", validateRequest(loginValidationSchema) ,AuthController.login);
// router.post("/register",validateRequest(userValidationSchema), AuthController.register);

router.post("/register", AuthController.registerUser);

router.post("/verify-otp", AuthController.verifyOtp);

router.post("/login", AuthController.loginUser);


export const AuthRoutes = router;