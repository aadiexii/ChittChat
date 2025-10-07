import { Outlet } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const AuthLayout = () => {
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 dark:bg-black/30 relative">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>
                {/* This Outlet component will render the specific page (Login, SignUp, etc.) */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;