export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-6">
          {children}
        </div>
      </div>
    );
}
  