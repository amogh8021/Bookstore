import React, { useState } from 'react';
import img from "../Components/assets/sign.gif";
import { useNavigate } from 'react-router-dom';
import { register, sendOtp, verifyOtp } from '../Services/authService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (email.trim().length === 0) {
      toast.error("Please enter email first");
      return;
    }
    try {
      await sendOtp(email.trim());
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  }

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (otp.trim().length === 0) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      await verifyOtp({ email: email.trim(), otp: otp.trim() });
      toast.success("Email verified successfully");
      setIsVerified(true);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  }

  // Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 8) {
      toast.error("Password should be minimum 8 characters");
      return;
    }
    if (!isVerified) {
      toast.error("Please verify your email first");
      return;
    }
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });
      toast.success("Signup successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <ToastContainer />
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-lg border border-white/20">

        {/* Left Content */}
        <div className="flex flex-col flex-1 p-10 gap-6 justify-center">
          <h1 className="text-3xl font-bold text-primary font-serif">Create an account</h1>

          <form className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-secondary">Full Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter your full name"
                className="input mt-1 bg-white/50"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-secondary">Email</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="input mt-1 bg-white/50 flex-1"
                />
                <button type="button"
                  onClick={handleSendOtp}
                  className="mt-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition">
                  Send OTP
                </button>
              </div>
            </div>

            {/* OTP Input (conditionally shown) */}
            {otpSent && !isVerified && (
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-secondary">Enter OTP</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otp}
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    className="input mt-1 bg-white/50 flex-1"
                  />
                  <button type="button"
                    onClick={handleVerifyOtp}
                    className="mt-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-secondary">Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="input mt-1 bg-white/50"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full mt-2"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </form>

          <div className="flex gap-2 mt-4 justify-center text-sm">
            <p className="text-secondary">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="text-accent font-semibold hover:underline"
            >
              login
            </button>
          </div>
        </div>



        {/* Right Image */}
        <div className="hidden md:flex flex-[1.3] items-center justify-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md mr-5">
          <img
            src={img}
            alt="gif"
            className="h-[65vh] object-cover drop-shadow-xl rounded-3xl"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
