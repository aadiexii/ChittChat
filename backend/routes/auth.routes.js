import express from "express";
import { login, logout, signup , requestOtp, resetPasswordWithOtp} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password/otp", requestOtp);

router.post("/reset-password/otp", resetPasswordWithOtp);

export default router;
