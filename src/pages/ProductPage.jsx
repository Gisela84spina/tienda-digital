import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductPage({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    const found = data.find((p) => p.id === Number(id));
    setProducto(found);
  }, [id]);

  if (!producto) {
    return (
      <p className="text-center text-gray-700 p-6 text-lg">
        Cargando producto...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
        
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-60 h-60 object-cover rounded-lg mb-4"
        />

        <h1 className="text-2xl font-semibold mb-2">{producto.nombre}</h1>

        <p className="text-xl text-blue-700 font-bold mb-2">
          ${producto.precio}
        </p>

        <p className="text-gray-600 mb-4">
          Categoría: <span className="font-medium">{producto.categoria}</span>
        </p>

        <p className="text-gray-700 mb-6">{producto.descripcion}</p>

        <button
          onClick={() => agregarAlCarrito(producto)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-lg"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
