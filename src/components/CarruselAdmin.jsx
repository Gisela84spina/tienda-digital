import { useState } from "react";
import { useCarrusel } from "../hooks/useCarrusel";

export default function CarruselAdmin() {
  const { imagenes, agregar, eliminar } = useCarrusel();
  

  const [subiendo, setSubiendo] = useState(false);
  const [imagen, setImagen] = useState("");
  
  const CLOUD_NAME = "dy2lgqgk6";
  const UPLOAD_PRESET = "tienda_upload";

  const handleImagenUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setSubiendo(true);
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      );
  
      const data = await res.json();
      setImagen(data.secure_url);
    } catch (err) {
      alert("Error subiendo imagen");
    } finally {
      setSubiendo(false);
    }
  };
  
  
  const handleAgregar = () => {
    if (!imagen || subiendo) return;
  
    agregar({
      id: crypto.randomUUID(),
      url: imagen
    });
    setImagen("");
  };
  

  const limiteAlcanzado = imagenes.length >= 3;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Carrusel - Administrar imágenes</h1>

      {/* AGREGAR IMAGEN */}
      <div className="flex gap-3 mb-6">
      <input
  type="file"
  accept="image/*"
  onChange={handleImagenUpload}
  disabled={limiteAlcanzado}
  className="border p-2 rounded flex-1"
  
/>
{imagen && (
  <img
    src={imagen}
    className="w-full h-32 object-cover rounded mb-3"
    alt="preview"
  />
)}



        <button
          onClick={handleAgregar}
          disabled={limiteAlcanzado || subiendo || !imagen}
          className={`px-4 py-2 rounded text-white ${
            limiteAlcanzado || subiendo || !imagen
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {limiteAlcanzado
  ? "Máximo alcanzado"
  : subiendo
  ? "Subiendo..."
  : "Agregar"}

        </button>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map((img) => (
          <div key={img.id} className="border p-4 rounded shadow">
            <img
              src={img.url}
              alt="Carrusel"
              className="w-full h-32 object-cover rounded mb-3"
            />

            <button
              onClick={() => eliminar(img.id)}
              className="bg-red-600 text-white w-full py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {imagenes.length === 0 && (
        <p className="text-gray-600 mt-6">No hay imágenes en el carrusel.</p>
      )}
    </div>
  );
}
