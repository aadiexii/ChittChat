import { useState, useRef } from "react";
import { BsSend, BsPaperclip } from "react-icons/bs";
import { FaFileAlt } from "react-icons/fa";
import useSendMessage from "../../hooks/useSendMessage";
import toast from "react-hot-toast";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(null);
	const { loading, sendMessage } = useSendMessage();
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			setFile(selectedFile);
			if (selectedFile.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result);
				};
				reader.readAsDataURL(selectedFile);
			} else {
				setPreview(selectedFile.name);
			}
		}
	};

	const uploadFile = async () => {
		if (!file) return null;
		const formData = new FormData();
		formData.append("file", file);
		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			return data;
		} catch (error) {
			toast.error("File upload failed. Please try again.");
			console.error("File upload error", error);
			return null;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message && !file) return;

		let fileData = null;
		if (file) {
			fileData = await uploadFile();
			if (!fileData) return;
		}

		await sendMessage({ message, fileUrl: fileData?.fileUrl, fileType: fileData?.fileType });

		setMessage("");
		setFile(null);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	return (
		<>
			{preview && (
				<div className='px-4 my-2 flex items-center justify-between bg-gray-200 dark:bg-gray-700 p-2 rounded-lg'>
					<div className='flex items-center gap-2 overflow-hidden'>
						{file && file.type.startsWith("image/") ? (
							<img src={preview} alt='Preview' className='w-12 h-12 object-cover rounded' />
						) : (
							<FaFileAlt className='w-8 h-8 text-gray-800 dark:text-gray-200 flex-shrink-0' />
						)}
						<span className='text-sm text-gray-800 dark:text-gray-200 truncate'>{file?.name}</span>
					</div>
					<button
						onClick={() => {
							setFile(null);
							setPreview(null);
							if (fileInputRef.current) fileInputRef.current.value = "";
						}}
						className='text-red-500 font-bold p-2'
					>
						X
					</button>
				</div>
			)}
			<form className='px-4 my-3' onSubmit={handleSubmit}>
				<div className='w-full relative'>
					<input type='file' ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
					<input
						type='text'
						className='border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
						placeholder='Send a message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<div className='absolute inset-y-0 end-0 flex items-center pe-3'>
						<button
							type='button'
							className='p-1 text-gray-800 dark:text-white'
							onClick={() => fileInputRef.current.click()}
						>
							<BsPaperclip />
						</button>
						<button type='submit' className='p-1 text-gray-800 dark:text-white'>
							{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
export default MessageInput;