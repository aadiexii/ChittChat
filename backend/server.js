import path from "path";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration from the main project
const rawFrontendUrls = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000";
const FRONTEND_URLS = rawFrontendUrls
	.split(",")
	.map((s) => s.trim().replace(/\/$/, ""))
	.filter(Boolean);

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || FRONTEND_URLS.includes(origin.replace(/\/$/, ""))) {
			return callback(null, true);
		}
		console.log("CORS blocked for origin:", origin, "allowed:", FRONTEND_URLS);
		return callback(null, false);
	},
	credentials: true,
};

app.use(cors(corsOptions));

// Your middleware to serve uploaded files
const uploadsPath = path.join(__dirname, "backend/public/uploads");
app.use("/uploads", express.static(uploadsPath));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

// Debug endpoint from the main project
app.get("/api/debug/origin", (req, res) => {
	const incomingOrigin = req.headers.origin || null;
	res.json({ incomingOrigin, allowedOrigins: FRONTEND_URLS });
});

// Logic to serve the built frontend from the main project
const frontendDistPath = path.join(__dirname, "frontend", "dist");
const frontendIndex = path.join(frontendDistPath, "index.html");
if (fs.existsSync(frontendIndex)) {
	app.use(express.static(frontendDistPath));

	app.get("*", (req, res) => {
		res.sendFile(frontendIndex);
	});
} else {
	console.log("Frontend build not found at", frontendIndex);
}

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});