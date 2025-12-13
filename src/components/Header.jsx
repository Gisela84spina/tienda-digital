import { Link } from "react-router-dom";

export default function Header({ cartCount }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white">

      {/* 🔥 Logo / título que envía al Home */}
      <Link to="/" className="text-xl font-bold hover:text-gray-300 transition">
        Tienda Digital
      </Link>

      {/* 🔥 Botón carrito */}
      <Link
        to="/cart"
        className="relative bg-gray-700 px-3 py-2 rounded hover:bg-gray-600 transition"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>

    </header>
  );
}

  