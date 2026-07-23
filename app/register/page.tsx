export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 border rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Register
        </button>
      </div>
    </main>
  );
}