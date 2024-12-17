import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to YouApp!</h1>
      <div className="flex flex-col gap-4">
        <Link href="/auth/login">
          <button className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
        </Link>
        <Link href="/auth/register">
          <button className="bg-green-500 text-white p-2 rounded w-full">Register</button>
        </Link>
      </div>
    </div>
  );
}
