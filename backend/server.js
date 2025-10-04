import path from "path";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

// Allow requests from the frontend. For local dev this will be http://localhost:3000
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
	cors({
		origin: FRONTEND_URL,
		credentials: true,
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend only if a build exists. In deployments where frontend is hosted separately
// (for example, Vercel), the `frontend/dist` directory may not be present — avoid ENOENT.
const frontendDistPath = path.join(__dirname, "frontend", "dist");
const frontendIndex = path.join(frontendDistPath, "index.html");
if (fs.existsSync(frontendIndex)) {
	app.use(express.static(frontendDistPath));

	app.get("*", (req, res) => {
		res.sendFile(frontendIndex);
	});
} else {
	console.log(
		"Frontend build not found at", frontendIndex, 
		". If you host the frontend separately (Vercel), this is expected."
	);
}

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
