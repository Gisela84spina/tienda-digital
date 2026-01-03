import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useSearchParams } from "react-router-dom";

export default function ListadoProductos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoria = searchParams.get("categoria") || "all";
  const orden = searchParams.get("orden") || "precio-asc";
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const qRef = query(
          collection(db, "productos"),
          where("eliminado", "==", false)
        );

        const snap = await getDocs(qRef);
        let data = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // búsqueda texto
        if (q) {
          data = data.filter(p =>
            p.nombre.toLowerCase().includes(q.toLowerCase())
          );
        }

        // filtro categoría
        if (categoria !== "all") {
          data = data.filter(p => p.categoria === categoria);
        }

        // orden
        if (orden === "precio-asc") {
          data.sort((a, b) => a.precio - b.precio);
        } else {
          data.sort((a, b) => b.precio - a.precio);
        }

        setProductos(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, [categoria, orden, q]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  if (loading) {
    return <p className="text-center p-6">Cargando productos...</p>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>

      {/* filtros */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select
          value={categoria}
          onChange={(e) => updateParam("categoria", e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">Todas las categorías</option>
          <option value="regalos">Regalos</option>
          <option value="calzado">Calzado</option>
        </select>

        <select
          value={orden}
          onChange={(e) => updateParam("orden", e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="precio-asc">Menor precio</option>
          <option value="precio-desc">Mayor precio</option>
        </select>
      </div>

      {/* grid */}
      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productos.map(p => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="bg-white shadow rounded-xl p-3"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <h2 className="text-sm font-medium">{p.nombre}</h2>
              <p className="text-blue-700 font-bold">
                ${Number(p.precio).toLocaleString("es-AR")}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
