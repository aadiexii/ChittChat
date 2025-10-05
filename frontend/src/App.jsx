import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import MagicCursorTrail from "./components/MagicCursorTrail"; // Adjust path as needed


function App() {
	const { authUser } = useAuthContext();
	const enableCursorTrail = true;
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			{enableCursorTrail && <MagicCursorTrail />}
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
