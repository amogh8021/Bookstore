import React, { useState } from "react";
import img from "../Components/assets/sign.gif";
import { useNavigate } from "react-router-dom";
import { login } from "../Services/authService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedData = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      const response = await login(cleanedData);

      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        window.dispatchEvent(new Event("login"));

        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);

        toast.success("Login successful");

        if (decoded.roles == "ROLE_USER") {
          navigate("/Home");
        }
        else {
          navigate("/admin")
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-lg border border-white/20">

        {/* Left Content */}
        <div className="flex flex-col flex-1 p-10 gap-6 justify-center">
          <h1 className="text-3xl font-bold text-primary font-serif">Welcome Back 👋</h1>
          <p className="text-secondary text-sm">Login to continue to your account</p>

          <form className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-secondary">Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className="input mt-1 bg-white/50"
              />
            </div>

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
              <div className="flex justify-end mt-1">
                <button
                  onClick={() => navigate("/forgot-password")} className="text-sm text-accent hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn-primary w-full mt-2"
            >
              Login
            </button>
          </form>

          {/* Divider
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div> */}

          {/* Social Buttons
          <div className="flex gap-4">
            <button className="flex-1 bg-black/80 text-white py-2 rounded-lg font-semibold hover:bg-black transition duration-300 shadow-md">
              Apple
            </button>
            <button className="flex-1 bg-gray-200/70 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-md">
              Google
            </button>
          </div>

          {/* Redirect to SignUp */}
          <div className="flex gap-2 mt-4 justify-center text-sm">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Sign Up
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
  );
};

export default LoginPage;
