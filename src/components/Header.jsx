import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header({ cartCount }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/productos?q=${encodeURIComponent(search)}`);
    setSearch("");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white gap-4">
      
      {/* Logo */}
      <Link to="/" className="text-xl font-bold hover:text-gray-300 transition">
        Tienda Digital
      </Link>

      {/* Buscador */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-md">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-black text-sm focus:outline-none"
        />
      </form>

      {/* Carrito */}
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
