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
				? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
				: { "Content-Type": "application/json" };
				
			const res = await fetch(`${API}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers,
				credentials: "include",
				body: JSON.stringify(messageData), // Correctly sends the whole data object
			});

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;