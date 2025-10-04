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

// Allow requests from one or more frontends. Set FRONTEND_URL or FRONTEND_URLS (comma separated)
const rawFrontendUrls = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000";
const FRONTEND_URLS = rawFrontendUrls.split(",").map((s) => s.trim());

const corsOptions = {
	origin: (origin, callback) => {
		// allow non-browser requests like curl or same-origin requests with no origin
		if (!origin) return callback(null, true);
		if (FRONTEND_URLS.includes(origin)) {
			return callback(null, true);
		}
		console.log("CORS blocked for origin:", origin, "allowed:", FRONTEND_URLS);
		return callback(new Error("Not allowed by CORS"), false);
	},
	credentials: true,
};

app.use((req, res, next) => {
	// helpful debug: log the Origin header for incoming browser requests
	if (req.headers.origin) {
		console.log("Incoming request origin:", req.headers.origin);
	}
	next();
});

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Debug endpoint to help diagnose CORS/origin issues. Returns the incoming Origin header and allowed origins.
app.get("/api/debug/origin", (req, res) => {
	const incomingOrigin = req.headers.origin || null;
	res.json({ incomingOrigin, allowedOrigins: FRONTEND_URLS });
});

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
