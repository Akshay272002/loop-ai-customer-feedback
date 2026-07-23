"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  console.log("Login button clicked");

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  console.log("Result:", result);

  if (result?.ok) {
    router.push("/dashboard");
  } else {
    alert("Invalid email or password");
  }
}

  return (
    <><Link
  href="/"
  className="inline-flex items-center gap-2 text-white-600 hover:text-blue-800 font-medium mb-6"
>
  ← Back to Home
</Link>
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 border rounded-xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </main>
    </>
  );
}