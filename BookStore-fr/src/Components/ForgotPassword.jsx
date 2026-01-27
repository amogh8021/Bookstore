import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1); // 1=email | 2=otp | 3=new password
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  // STEP 1 → SEND OTP
  const handleSendOtp = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/forgot-password",
        null,
        { params: { email } }
      );

      toast.success("OTP Sent Successfully!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // STEP 2 → VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/verify-reset-otp",
        null,
        { params: { otp, email } }
      );

      toast.success("OTP Verified!");
      setStep(3); // move to reset password
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // STEP 3 → RESET PASSWORD API
  const handleResetPassword = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/reset-password",
        null,
        { params: { email, password } }
      );

      toast.success("Password Reset Successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      {/* STEP 1 — EMAIL INPUT */}
      {step === 1 && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-2 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Send Reset OTP
          </button>
        </div>
      )}

      {/* STEP 2 — OTP INPUT */}
      {step === 2 && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">Enter OTP</h2>

          <input
            type="text"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            className="w-full border px-4 py-2 rounded-lg mb-4 text-center tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Verify OTP
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full mt-3 text-blue-600 hover:underline"
          >
            Change Email
          </button>
        </div>
      )}

      {/* STEP 3 — RESET PASSWORD */}
      {step === 3 && (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border px-4 py-2 rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleResetPassword}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Reset Password
          </button>
        </div>
      )}

    </div>
  );
};

export default ForgotPassword;
