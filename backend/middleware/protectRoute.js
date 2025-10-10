import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // Support cookie-based JWT or Authorization: Bearer <token>
    let token = req.cookies?.jwt;

    if (!token) {
      const auth = req.headers.authorization || req.headers.Authorization || "";
      if (auth && auth.startsWith("Bearer ")) {
        token = auth.split(" ")[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(401).json({ error: "Unauthorized - Invalid or Expired Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Internal Server Error in protectRoute" });
  }
};

export default protectRoute;
