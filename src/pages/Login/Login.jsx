import React, { useState } from "react";
import { Eye, EyeOff, Gift } from "lucide-react";
import LoginImage from "../../assets/images/img2.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log({ email, password, rememberMe });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration (60%) */}
      <div className="hidden lg:flex lg:w-[60%] items-center justify-center bg-gray-50">
        <img
          src={LoginImage}
          alt="Login illustration"
          className="w-[650px] h-auto object-contain"
        />
      </div>

      {/* Right side - Form (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="mb-8 flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Production Monitoring System</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back
              </span>{" "}
             
            </h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
