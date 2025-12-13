
export default function ProductCard({ producto, agregarAlCarrito }) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-200">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-32 h-32 object-cover mb-3 rounded-lg"
        />
        <h3 className="font-semibold text-lg">{producto.nombre}</h3>
        <p className="text-gray-600">${producto.precio}</p>
        <button
          onClick={() => agregarAlCarrito(producto)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    )
  }
  