export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-blue-600 text-white text-3xl shadow-lg"
    >
      +
    </button>
  );
}