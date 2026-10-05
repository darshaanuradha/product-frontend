"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setMessage("Please enter username and password");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      console.log("Login response:", response.status);
      console.log("Login data:", data);

      if (!response.ok) {
        setMessage(
          typeof data === "string" ? data : "Invalid username or password",
        );

        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      console.log("JWT saved:", data.token);

      // Go to product page
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Cannot connect to backend. Make sure Spring Boot is running.",
      );
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="border rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

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

        {/* ERROR MESSAGE */}

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {/* LOGIN BUTTON */}

        <button
          onClick={login}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </main>
  );
}
