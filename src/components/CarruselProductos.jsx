import { Link } from "react-router-dom";

export default function CarruselProductos({ titulo, productos }) {
  if (!productos?.length) return null;

  return (
    <section className="my-10">
      <h2 className="text-xl font-semibold mb-4">{titulo}</h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {productos.slice(0, 5).map(prod => (
          <Link
            key={prod.id}
            to={`/producto/${prod.id}`}
            className="min-w-[160px] bg-white shadow rounded-lg p-3 flex-shrink-0"
          >
            <img
              src={prod.imagenes?.[0] || "/placeholder.png"}
              alt={prod.nombre}
              className="w-full h-32 object-cover rounded"
            />

            <h3 className="mt-2 text-sm font-medium">{prod.nombre}</h3>
            <p className="text-sm text-gray-700">${prod.precio}</p>
          </Link>
        ))}

        {/* VER TODO */}
        <Link
          to="/productos"
          className="min-w-[160px] flex items-center justify-center 
                     border-2 border-dashed rounded-lg text-gray-600"
        >
          Ver todo →
        </Link>
      </div>
    </section>
  );
}
