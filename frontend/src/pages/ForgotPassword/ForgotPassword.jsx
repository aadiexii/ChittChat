import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { loading, otpSent, sendOtp, resetPassword, setOtpSent } = useForgotPassword();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        await sendOtp(email);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!otp || !newPassword || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const success = await resetPassword({ email, otp, newPassword, confirmPassword });
        if (success) {
            toast.success("Password reset successful!");
            navigate("/login");
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Please enter your email");
            return;
        }
        await sendOtp(email);
    };

    return (
        <>
            <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-8">
                Forgot Password
                <span className="text-blue-500"> ChitChat</span>
            </h1>

            <form className="mx-6 my-6">
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text text-gray-800 dark:text-gray-200">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={otpSent}
                    />
                </div>

                {otpSent && (
                    <>
                        <div className="mt-4">
                            <label className="label p-2">
                                <span className="text-base label-text text-gray-800 dark:text-gray-200">OTP</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label className="label p-2">
                                <span className="text-base label-text text-gray-800 dark:text-gray-200">New Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-2">
                            <label className="label p-2">
                                <span className="text-base label-text text-gray-800 dark:text-gray-200">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                className="w-full input input-bordered h-10 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="flex justify-between mt-4 gap-2">
                    {!otpSent ? (
                        <button className="btn btn-block btn-sm bg-sky-500 text-white dark:bg-sky-600" onClick={handleSendOtp} disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Send OTP"}
                        </button>
                    ) : (
                        <>
                            <button className="btn btn-outline btn-sm flex-1 dark:text-white dark:border-gray-400 dark:hover:bg-gray-700" onClick={handleResendOtp} disabled={loading} type="button">
                                {loading ? <span className="loading loading-spinner"></span> : "Resend OTP"}
                            </button>
                            <button className="btn btn-sm bg-sky-500 text-white dark:bg-sky-600 flex-1" onClick={handleResetPassword} disabled={loading} type="button">
                                {loading ? <span className="loading loading-spinner"></span> : "Set Password"}
                            </button>
                        </>
                    )}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200" onClick={() => setOtpSent(false)}>
                        Back to Login
                    </Link>
                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 text-gray-800 dark:text-gray-200">
                        {"Don't"} have an account?
                    </Link>
                </div>
            </form>
        </>
    );
};

export default ForgotPassword;