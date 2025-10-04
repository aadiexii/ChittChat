import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const rawFrontendUrls = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000";
const CLIENT_ORIGINS = rawFrontendUrls
	.split(",")
	.map((s) => s.trim().replace(/\/$/, ""))
	.filter(Boolean);

const io = new Server(server, {
	cors: {
		origin: CLIENT_ORIGINS,
		methods: ["GET", "POST"],
		credentials: true,
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

export const getAllOnlineUsers = () => {
	return { ...userSocketMap };
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	// Support both query and auth handshake formats and token-based handshake
	const { auth = {}, query = {} } = socket.handshake;
	let userId = query.userId || auth.userId;
	// If token is provided, verify and extract userId
	if (!userId && auth.token) {
		try {
			const jwt = require('jsonwebtoken');
			const decoded = jwt.verify(auth.token, process.env.JWT_SECRET);
			userId = decoded.userId;
		} catch (err) {
			console.log('Invalid socket auth token for socket', socket.id);
		}
	}

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
		console.log(`Registered user ${userId} -> socket ${socket.id}`);
	} else {
		console.log("No userId provided in handshake for socket", socket.id);
	}

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		// find key by socket id and delete
		for (const [uid, sid] of Object.entries(userSocketMap)) {
			if (sid === socket.id) {
				delete userSocketMap[uid];
				break;
			}
		}
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
