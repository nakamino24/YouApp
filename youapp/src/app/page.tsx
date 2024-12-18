import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative">
        {/* Hero Content */}
        <h1 className="text-6xl font-bold mb-6 tracking-wide leading-tight">
          Discover the Future with <span className="text-blue-500">YouApp</span>
        </h1>
        <p className="text-gray-300 mb-8 max-w-2xl leading-relaxed">
          Unlock a world of innovation and simplicity. Seamlessly manage your
          tasks, connect with others, and elevate your digital experience. Get
          started today by signing in or creating a new account.
        </p>
        <div className="flex gap-6">
          <Link href="/auth/login" legacyBehavior>
            <button className="px-8 py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 transition duration-300 shadow-lg">
              Sign In
            </button>
          </Link>
          <Link href="/auth/register" legacyBehavior>
            <button className="px-8 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-lg">
              Create Account
            </button>
          </Link>
        </div>

        {/* Enhanced Decorative Element */}
        <div className="mt-12 w-48 h-1 bg-blue-500 rounded-full shadow-md" />
        <div className="absolute inset-0 pointer-events-none flex justify-between">
          <div
            className="w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-2xl"
            style={{ marginTop: "10%", marginLeft: "5%" }}
          ></div>
          <div
            className="w-16 h-16 bg-gray-500 opacity-20 rounded-full blur-2xl"
            style={{ marginBottom: "10%", marginRight: "5%" }}
          ></div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
