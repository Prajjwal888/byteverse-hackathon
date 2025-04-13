import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gift, Mail, Lock, ArrowLeft } from "lucide-react";
import axios from 'axios'
function ReceiverLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
          role: "receiver",
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/receiverDashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add forgot password logic here
    console.log("Password reset requested for:", forgotEmail);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-2 mb-8">
          <Gift className="w-8 h-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">ShareCare</span>
        </div>

        {!showForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Welcome back
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </button>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Sign in
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              First time here?{" "}
              <button
                onClick={() => navigate("/receiverRegister")}
                className="text-green-600 hover:text-green-500 font-medium"
              >
                Create an account
              </button>
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="ml-1">Back to login</span>
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Reset your password
            </h2>
            <p className="text-gray-600 mb-8">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    id="forgot-email"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Send reset instructions
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ReceiverLogin;
