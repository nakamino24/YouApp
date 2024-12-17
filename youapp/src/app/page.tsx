import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to YouApp!</h1>
      <p className="text-gray-400 mb-8 text-center max-w-sm">
        Simplify your experience with modern design and functionality. Start by logging in or creating an account!
      </p>

      <div className="w-full max-w-xs space-y-4">
        <Link href="/auth/login">
          <button className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300 mb-2">
            Login
          </button>
        </Link>
        <Link href="/auth/register">
          <button className="w-full py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
