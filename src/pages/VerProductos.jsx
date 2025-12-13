import { useState } from "react";
import { Link } from "react-router-dom";

export default function VerProductos({ productos, eliminarProducto, restaurarProducto }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("activos"); 
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  // 🔎 Filtrar por búsqueda
  const filtradosPorBusqueda = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🚦 Filtrar por estado
  const filtradosPorEstado = filtradosPorBusqueda.filter((p) => {
    if (filtroEstado === "activos") return !p.eliminado;
    if (filtroEstado === "eliminados") return p.eliminado;
    return true; // todos
  });

  // 📊 Orden por precio
  const ordenados = [...filtradosPorEstado].sort((a, b) => {
    if (ordenPrecio === "asc") return a.precio - b.precio;
    if (ordenPrecio === "desc") return b.precio - a.precio;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Gestión de Productos 📦
        </h1>

        {/* 🔍 Buscador + Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full md:w-1/3 p-2 border rounded"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="activos">Activos</option>
            <option value="eliminados">Eliminados</option>
            <option value="todos">Todos</option>
          </select>

          <select
            className="p-2 border rounded"
            value={ordenPrecio}
            onChange={(e) => setOrdenPrecio(e.target.value)}
          >
            <option value="ninguno">Ordenar por precio</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>

        </div>

        {/* 📋 Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3 text-left">Imagen</th>
                <th className="border p-3 text-left">Nombre</th>
                <th className="border p-3 text-left">Precio</th>
                <th className="border p-3 text-left">Estado</th>
                <th className="border p-3 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ordenados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              ) : (
                ordenados.map((p) => (
                  <tr key={p.id} className="border hover:bg-gray-50">

                    <td className="p-3">
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>

                    <td className="p-3">{p.nombre}</td>
                    <td className="p-3">${p.precio}</td>

                    <td className="p-3">
                      {p.eliminado ? (
                        <span className="text-red-600 font-semibold">Eliminado</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Activo</span>
                      )}
                    </td>

                    {/* Botones */}
                    <td className="p-3 flex gap-2 justify-center">

                      {!p.eliminado && (
                        <Link
                          to={`/admin/editar/${p.id}`}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Editar
                        </Link>
                      )}

                      {!p.eliminado ? (
                        <button
                          onClick={() => {
                            if (window.confirm(`¿Eliminar "${p.nombre}"?`))
                              eliminarProducto(p.id);
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      ) : (
                        <button
                          onClick={() => restaurarProducto(p.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Restaurar
                        </button>
                      )}

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Link
          to="/admin"
          className="mt-6 block bg-gray-700 text-white py-2 rounded-lg text-center font-semibold hover:bg-gray-800"
        >
          Volver al panel admin
        </Link>

      </div>
    </div>
  );
}
