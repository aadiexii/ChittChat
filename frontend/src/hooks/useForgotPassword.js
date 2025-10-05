import { useState } from "react";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Send OTP
  const sendOtp = async (email) => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/forgot-password/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message || "OTP sent successfully!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password using OTP
  const resetPassword = async ({ email, otp, newPassword, confirmPassword }) => {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/reset-password/otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(data.message || "Password reset successfully!");
      setOtpSent(false); // reset form after success
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, otpSent, sendOtp, resetPassword, setOtpSent };
};

export default useForgotPassword;
