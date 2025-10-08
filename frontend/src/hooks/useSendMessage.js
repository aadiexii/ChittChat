import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (messageData) => {
		setLoading(true);
		try {
			const API = import.meta.env.VITE_API_URL || "";
			const token = localStorage.getItem("chat-token");

			const headers = token
				? {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
				  }
				: { "Content-Type": "application/json" };

			const res = await fetch(`${API}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify(messageData),
			});

			// Safely handle backend response
			let data;
			try {
				data = await res.json();
			} catch {
				throw new Error("Server returned no data or invalid JSON");
			}

			// If backend returned an error status
			if (!res.ok) {
				throw new Error(data?.error || "Failed to send message");
			}

			// Append new message to state
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message || "Something went wrong while sending the message");
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;
