export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      {/* Month Selector */}
      <div className="text-lg font-semibold">
        January 2026
      </div>

      {/* Icons */}
      <div className="flex gap-4 text-gray-600">
        <button className="hover:text-black">🔍</button>
        <button className="hover:text-black">📅</button>
        <button className="hover:text-black">⚙️</button>
      </div>
    </header>
  );
}