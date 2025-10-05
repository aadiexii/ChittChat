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
  const { loading, otpSent, sendOtp, resetPassword, setOtpSent } =
    useForgotPassword();

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    await sendOtp(email);
  };

  // Reset Password with validation
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Call hook's resetPassword
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
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Forgot Password
          <span className="text-black"> ChitChat</span>
        </h1>

        <form className="mt-4">
          {/* Email input */}
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={otpSent}
            />
          </div>

          {/* OTP + Password fields */}
          {otpSent && (
            <>
              <div className="mt-4">
                <label className="label p-2">
                  <span className="text-base label-text">OTP</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full input input-bordered h-10"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="mt-2">
                <label className="label p-2">
                  <span className="text-base label-text">New Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter New Password"
                  className="w-full input input-bordered h-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mt-2">
                <label className="label p-2">
                  <span className="text-base label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full input input-bordered h-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-4 gap-2">
            {!otpSent ? (
              <button
                className="btn btn-block btn-sm hover:bg-blue-600 hover:text-white transition-colors"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : "Send OTP"}
              </button>
            ) : (
              <>
                <button
                  className="btn btn-outline btn-sm flex-1 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                  onClick={handleResendOtp}
                  disabled={loading}
                  type="button"
                >
                  {loading ? <span className="loading loading-spinner"></span> : "Resend OTP"}
                </button>

                <button
                  className="btn btn-sm hover:bg-blue-600 hover:text-white transition-colors"
                  style={{ width: "37%" }}
                  onClick={handleResetPassword}
                  disabled={loading}
                  type="button"
                >
                  {loading ? <span className="loading loading-spinner"></span> : "Set Password"}
                </button>
              </>
            )}
          </div>

          {/* Links */}
          <div className="flex justify-between items-center mt-4">
            <Link
              to="/login"
              className="text-sm hover:underline hover:text-blue-600"
              onClick={() => setOtpSent(false)}
            >
              Back to Login
            </Link>
            <Link
              to="/signup"
              className="text-sm hover:underline hover:text-blue-600"
            >
              {"Don't"} have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
