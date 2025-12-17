
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function VerProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("activos");
  const [ordenPrecio, setOrdenPrecio] = useState("ninguno");

  const cargarProductos = async () => {
    const snap = await getDocs(collection(db, "productos"));
    const lista = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      eliminado: doc.data().eliminado ?? false,
    }));
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    await updateDoc(doc(db, "productos", id), { eliminado: true });
    cargarProductos();
  };

  const restaurarProducto = async (id) => {
    await updateDoc(doc(db, "productos", id), { eliminado: false });
    cargarProductos();
  };

  const ordenados = productos
    .filter(p =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter(p => {
      if (filtroEstado === "activos") return !p.eliminado;
      if (filtroEstado === "eliminados") return p.eliminado;
      return true;
    })
    .sort((a, b) => {
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

        <div className="flex gap-4 mb-6 flex-wrap">
          <input
            placeholder="Buscar..."
            className="p-2 border rounded"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />

          <select
            className="p-2 border rounded"
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
          >
            <option value="activos">Activos</option>
            <option value="eliminados">Eliminados</option>
            <option value="todos">Todos</option>
          </select>

          <select
            className="p-2 border rounded"
            value={ordenPrecio}
            onChange={e => setOrdenPrecio(e.target.value)}
          >
            <option value="ninguno">Precio</option>
            <option value="asc">↑</option>
            <option value="desc">↓</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {ordenados.map(p => (
              <tr key={p.id} className="border">
                <td>
                  {p.imagen
                    ? <img src={p.imagen} className="w-16 h-16 object-cover" />
                    : "—"}
                </td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.eliminado ? "Eliminado" : "Activo"}</td>
                <td className="px-2 py-2 w-[180px]">
                 <div className="flex flex-wrap gap-2 justify-center">

                  {!p.eliminado && (
                    <Link
                      to={`/admin/editar/${p.id}`}
                      className="bg-blue-600 text-white px-2 rounded"
                    >
                      Editar
                    </Link>
                  )}

                  {!p.eliminado ? (
                    <button
                      onClick={() => eliminarProducto(p.id)}
                      className="bg-red-600 text-white px-2 rounded"
                    >
                      Eliminar
                    </button>
                  ) : (
                    <button
                      onClick={() => restaurarProducto(p.id)}
                      className="bg-green-600 text-white px-2 rounded"
                    >
                      Reactivar
                    </button>
                  )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
