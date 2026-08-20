"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginAdmin({ username, password });
      
      if (response.token) {
        // Save the token
        localStorage.setItem("adminToken", response.token);
        
        // Redirect to dashboard
        router.push("/mcadminportal");
      } else {
        setError("Invalid response from server.");
      }
    } catch (err: any) {
      setError(err.message || "Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-poppins">
          Merciful Centre
        </h1>
        <p className="text-gray-600 mt-2">Admin Portal</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-purple-600 text-white font-medium py-3 rounded-lg transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
      
      <div className="mt-8">
        <a href="/" className="text-purple-400 hover:text-purple-300 text-sm">
          &larr; Return to main website
        </a>
      </div>
    </div>
  );
}
