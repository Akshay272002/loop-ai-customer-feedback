import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
            L
          </div>

          <div>
            <h1 className="font-bold text-xl text-gray-900">
              LOOP AI
            </h1>

            <p className="text-xs text-gray-500">
              Customer Intelligence
            </p>
          </div>
        </Link>

        {/* Navigation */}


        {/* Buttons */}

        <div className="flex gap-3 text-black">

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg  border-gray-300 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/feedback"
            className="px-5 py-2 rounded-lg text-black hover:text-blue-600"
          >
            Feedback
          </Link>

        </div>

      </div>
    </header>
  );
}