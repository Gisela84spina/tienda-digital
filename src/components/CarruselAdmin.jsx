import { useState } from "react";
import { useCarrusel } from "../hooks/useCarrusel";

const CLOUD_NAME = "dy2lgqgk6";
const UPLOAD_PRESET = "tienda_upload";
const MAX_PRODUCTOS = 5;

export default function CarruselAdmin({ productos }) {
  const {
    carruseles,
    agregarCarrusel,
    eliminarCarrusel,
    moverCarrusel,
    actualizarCarrusel
  } = useCarrusel();

  const [busqueda, setBusqueda] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preview, setPreview] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  /* ------------------ SUBIR IMAGEN ------------------ */
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
        { method: "POST", body: formData }
      );

      const data = await res.json();
      setPreview(data.secure_url);
    } catch {
      alert("Error subiendo imagen");
    } finally {
      setSubiendo(false);
    }
  };

  /* ------------------ AGREGAR CARRUSEL ------------------ */
  const handleAgregar = async () => {
    if (!titulo || !preview || subiendo) return;

    await agregarCarrusel({
      titulo,
      categoria,
      url: preview,
      productos: [],
      orden: carruseles.length
    });

    setTitulo("");
    setCategoria("");
    setPreview("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Carruseles</h1>

      {/* ================= AGREGAR ================= */}
      <div className="border rounded-lg p-4 mb-10 space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Categoría (opcional)"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImagenUpload}
        />

        {preview && (
          <img
            src={preview}
            className="w-full sm:w-64 h-36 object-cover rounded"
            alt="preview"
          />
        )}

        <button
          onClick={handleAgregar}
          disabled={subiendo || !preview || !titulo}
          className={`px-4 py-2 rounded text-white ${
            subiendo || !preview || !titulo
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Agregar carrusel
        </button>
      </div>

      {/* ================= LISTA + ORDEN ================= */}
      <div className="space-y-4">
        {carruseles.map((c, index) => (
          <div key={c.id} className="border p-4 rounded-lg space-y-3">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={c.url}
                  className="w-16 h-10 object-cover rounded"
                  alt={c.titulo}
                />
                <div>
                  <p className="font-medium">{c.titulo}</p>
                  <p className="text-xs text-gray-500">
                    Productos: {c.productos?.length || 0} / {MAX_PRODUCTOS}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => moverCarrusel(c, "up")}
                  disabled={index === 0}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-40"
                >
                  ↑
                </button>

                <button
                  onClick={() => moverCarrusel(c, "down")}
                  disabled={index === carruseles.length - 1}
                  className="px-2 py-1 bg-gray-200 rounded disabled:opacity-40"
                >
                  ↓
                </button>

                <button
                  onClick={() => eliminarCarrusel(c.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* ================= PRODUCTOS ================= */}
            <div className="border-t pt-3">
              <input
                type="text"
                placeholder="Buscar producto..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full border p-2 rounded mb-3 text-sm"
              />

              <div className="max-h-48 overflow-y-auto space-y-2">
                {productos
                  .filter(
                    p =>
                      !p.eliminado &&
                      p.nombre
                        .toLowerCase()
                        .includes(busqueda.toLowerCase())
                  )
                  .map(p => {
                    const activo = c.productos?.includes(p.id);

                    return (
                      <label
                        key={p.id}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={activo}
                          onChange={() => {
                            if (
                              !activo &&
                              (c.productos?.length || 0) >= MAX_PRODUCTOS
                            ) {
                              alert("Máximo 5 productos por carrusel");
                              return;
                            }

                            const nuevosProductos = activo
                              ? c.productos.filter(id => id !== p.id)
                              : [...(c.productos || []), p.id];

                            actualizarCarrusel(c.id, {
                              productos: nuevosProductos
                            });
                          }}
                        />
                        <span>{p.nombre}</span>
                      </label>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


