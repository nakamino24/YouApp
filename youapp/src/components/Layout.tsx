export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          {children}
        </div>
      </div>
    );
}
  