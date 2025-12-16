import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const CLOUD_NAME = "dy2lgqgk6";
  const UPLOAD_PRESET = "tienda_upload";

  // 🔹 Cargar producto
  useEffect(() => {
    const cargar = async () => {
      const ref = doc(db, "productos", id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("Producto no encontrado");
        navigate("/admin/productos");
        return;
      }

      const p = snap.data();
      setNombre(p.nombre);
      setPrecio(p.precio);
      setImagen(p.imagen || "");
      setCategoria(p.categoria || "");
      setLoading(false);
    };

    cargar();
  }, [id, navigate]);

  // 🔹 Subir nueva imagen
  const subirImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendo(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setImagen(data.secure_url);
    setSubiendo(false);
  };

  // 🔹 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (precio <= 0) return alert("Precio inválido");

    await updateDoc(doc(db, "productos", id), {
      nombre,
      precio: Number(precio),
      imagen,
      categoria
    });

    alert("Producto actualizado");
    navigate("/admin/productos");
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Editar producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full p-2 border rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full p-2 border rounded"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <select
          className="w-full p-2 border rounded"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Categoría</option>
          <option value="ropa">Ropa</option>
          <option value="calzado">Calzado</option>
          <option value="accesorios">Accesorios</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={subirImagen}
        />

        {imagen && (
          <img
            src={imagen}
            className="w-full h-40 object-cover rounded"
            alt="preview"
          />
        )}

        <button
          disabled={subiendo}
          className={`w-full p-2 rounded text-white ${
            subiendo ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {subiendo ? "Subiendo..." : "Guardar cambios"}
        </button>

      </form>
    </div>
  );
}
