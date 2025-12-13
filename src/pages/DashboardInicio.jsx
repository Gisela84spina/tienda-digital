import { Link } from "react-router-dom";

export default function DashboardInicio({ productos }) {
  const total = productos.length;

  const activos = productos.filter(p => !p.eliminado).length;
  const eliminados = productos.filter(p => p.eliminado).length;

  const masCaro = productos.length > 0
    ? productos.reduce((max, p) => p.precio > max.precio ? p : max)
    : null;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">Panel Administrativo</h1>
      <p className="text-gray-600 mb-4">Resumen general de tu tienda</p>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL */}
        <Link
          to="/admin/productos"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer block"
        >
          <h2 className="text-xl font-semibold">Total productos</h2>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </Link>

        {/* ACTIVOS */}
        <Link
          to="/admin/productos"
          className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer block"
          onClick={() => localStorage.setItem("adminFiltro", "activos")}
        >
          <h2 className="text-xl font-semibold">Activos</h2>
          <p className="text-3xl font-bold mt-2">{activos}</p>
        </Link>

        {/* ELIMINADOS */}
        <Link
          to="/admin/productos"
          className="bg-red-100 p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer block"
          onClick={() => localStorage.setItem("adminFiltro", "eliminados")}
        >
          <h2 className="text-xl font-semibold">Eliminados</h2>
          <p className="text-3xl font-bold mt-2">{eliminados}</p>
        </Link>

      </div>

    </div>
  );
}
