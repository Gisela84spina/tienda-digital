import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditarProducto({ productos, actualizarProducto }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const producto = productos.find((p) => p.id === Number(id));

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setPrecio(producto.precio);
      setImagen(producto.imagen);
      setDescripcion(producto.descripcion);
    }
  }, [producto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productoActualizado = {
      ...producto,
      nombre,
      precio: Number(precio),
      imagen,
      descripcion,
    };

    actualizarProducto(productoActualizado);

    alert("Producto actualizado con éxito");
    navigate("/admin/productos");
  };

  if (!producto) return <p className="p-6">Producto no encontrado</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          Editar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-semibold mb-1">Nombre:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Precio:</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Imagen (URL):</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Descripción:</label>
            <textarea
              className="w-full p-2 border rounded"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 font-semibold"
          >
            Guardar cambios
          </button>

        </form>
      </div>
    </div>
  );
}
