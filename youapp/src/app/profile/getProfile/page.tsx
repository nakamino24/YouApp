import PencilIcon from "../../../components/icons/PencilIcon";

export default function ProfilePage() {
  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400 hover:text-white">&lt; Back</button>
        <h1 className="text-white text-lg font-semibold">@johndoe</h1>
        <button className="text-gray-400 hover:text-white">•••</button>
      </div>

      {/* Bio Section */}
      <div className="relative bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-white font-semibold">@johndoe123</p>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>

      {/* About Section */}
      <div className="relative bg-gray-800 rounded-lg p-4 mb-4">
        <h2 className="text-white font-semibold mb-1">About</h2>
        <p className="text-gray-400">Add in your bio to help others know you better</p>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Interest Section */}
      <div className="relative bg-gray-800 rounded-lg p-4">
        <h2 className="text-white font-semibold mb-1">Interest</h2>
        <p className="text-gray-400">Add in your interest to find a better match</p>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-white">
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
