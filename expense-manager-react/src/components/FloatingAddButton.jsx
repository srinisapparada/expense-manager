export default function FloatingAddButton() {
  return (
    <button
      className="fixed bottom-20 right-5 w-14 h-14 rounded-full 
                 bg-blue-600 text-white text-3xl 
                 flex items-center justify-center 
                 shadow-lg active:scale-95"
      aria-label="Add transaction"
    >
      +
    </button>
  );
}
