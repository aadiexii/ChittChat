import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar , getProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile", protectRoute, getProfile);

export default router;
