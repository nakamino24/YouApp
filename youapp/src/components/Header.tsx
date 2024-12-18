import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 py-4 px-8 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2"
        />
        <h1 className="text-2xl font-bold tracking-wide">YouApp</h1>
      </div>
      <nav className="space-x-4">
        <Link href="/auth/login" className="hover:text-blue-400 transition">
          Login
        </Link>
        <Link href="/auth/register" className="hover:text-blue-400 transition">
          Register
        </Link>
      </nav>
    </header>
  );
}
