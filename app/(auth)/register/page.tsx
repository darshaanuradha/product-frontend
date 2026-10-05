"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!username || !password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      // Backend returns plain text, not JSON
      const data = await response.text();

      console.log("Register response:", response.status);
      console.log("Register data:", data);

      if (!response.ok) {
        setMessage(data || "Registration failed");
        setLoading(false);
        return;
      }

      setMessage("Registration successful! Redirecting to login...");

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("Register error:", error);

      setMessage(
        "Cannot connect to backend. Make sure Spring Boot is running.",
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        {/* USERNAME */}
        <div className="mb-4">
          <label className="block mb-2">Username</label>

          <input
            className="border p-2 w-full"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-4">
          <label className="block mb-2">Password</label>

          <input
            className="border p-2 w-full"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mb-4">
          <label className="block mb-2">Confirm Password</label>

          <input
            className="border p-2 w-full"
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            className={`mb-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* REGISTER BUTTON */}
        <button
          onClick={register}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LOGIN LINK */}
        <div className="text-center mt-5">
          <span className="text-gray-600">Already have an account?</span>

          <button
            onClick={() => router.push("/login")}
            className="text-blue-500 ml-2 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
