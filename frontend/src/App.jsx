import { useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import MagicCursorTrail from "./components/MagicCursorTrail";

function App() {
    const { authUser } = useAuthContext();
    const { theme } = useContext(ThemeContext);
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
            <Toaster
                toastOptions={{
                    style: {
                        background: theme === 'dark' ? '#374151' : '#ffffff',
                        color: theme === 'dark' ? '#ffffff' : '#000000',
                    },
                }}
            />
        </div>
    );
}

export default App;