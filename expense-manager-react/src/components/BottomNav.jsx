export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
      <div className="flex justify-around py-2 text-xs text-gray-500">
        <button className="flex flex-col items-center text-blue-600">
          <span className="text-lg">🏠</span>
          Home
        </button>

        <button className="flex flex-col items-center">
          <span className="text-lg">📊</span>
          Stats
        </button>

        <button className="flex flex-col items-center">
          <span className="text-lg">⚙️</span>
          Settings
        </button>
      </div>
    </nav>
  );
}
