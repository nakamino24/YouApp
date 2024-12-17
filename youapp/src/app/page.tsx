import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      {/* Header */}
      <header className="w-full bg-gray-900 py-4 px-8 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold">YouApp</h1>
        <nav className="space-x-4">
          <Link href="/auth/login" className="hover:text-blue-400 transition">Login</Link>
          <Link href="/auth/register" className="hover:text-blue-400 transition">Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold mb-6">Welcome to YouApp!</h1>
        <p className="text-gray-400 mb-8 max-w-lg">
          Simplify your experience with modern design and functionality. Start by logging in or creating an account!
        </p>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <button className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-4 text-center text-gray-500">
        <p>&copy; 2024 YouApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
