import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";

export default function AdminGlobitos() {
  const [globitos, setGlobitos] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  const MAX_GLOBITOS = 5;

  const CLOUD_NAME = "dy2lgqgk6";
  const UPLOAD_PRESET = "tienda_upload";

  /* =========================
     CARGAR GLOBITOS
  ========================= */
  const cargarGlobitos = async () => {
    const snap = await getDocs(collection(db, "globitos"));
    const lista = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setGlobitos(lista);
  };

  useEffect(() => {
    cargarGlobitos();
  }, []);

  const activos = globitos.filter(g => !g.eliminado);

  /* =========================
     SUBIR IMAGEN
  ========================= */
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

  /* =========================
     AGREGAR GLOBITO
  ========================= */
  const handleAgregar = async (e) => {
    e.preventDefault();

    if (!titulo || !categoria || !imagen) {
      alert("Completá todos los campos");
      return;
    }

    if (activos.length >= MAX_GLOBITOS) {
      alert("Máximo 5 globitos activos");
      return;
    }

    await addDoc(collection(db, "globitos"), {
      titulo,
      categoria,
      imagen,
      eliminado: false,
      createdAt: serverTimestamp()
    });

    setTitulo("");
    setCategoria("");
    setImagen("");

    cargarGlobitos();
  };

  /* =========================
     ACTIVAR / DESACTIVAR
  ========================= */
  const toggleGlobito = async (globito) => {
    if (globito.eliminado && activos.length >= MAX_GLOBITOS) {
      alert("Máximo 5 globitos activos");
      return;
    }

    const ref = doc(db, "globitos", globito.id);
    await updateDoc(ref, { eliminado: !globito.eliminado });

    cargarGlobitos();
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="space-y-10">

      {/* FORM */}
      <div className="max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Agregar globito</h2>

        <form onSubmit={handleAgregar} className="space-y-4">

          <input
            type="text"
            placeholder="Título"
            className="w-full p-2 border rounded"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            type="text"
            placeholder="Categoría (ej: regalos)"
            className="w-full p-2 border rounded"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImagenUpload}
          />

          {imagen && (
            <img
              src={imagen}
              alt="preview"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          <button
            disabled={subiendo}
            className={`w-full py-2 rounded text-white ${
              subiendo ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {subiendo ? "Subiendo..." : "Agregar globito"}
          </button>
        </form>
      </div>

      {/* LISTADO */}
      <div>
        <h2 className="text-xl font-bold mb-2">Globitos</h2>
        <p className="text-sm text-gray-500 mb-4">
          Activos: {activos.length} / {MAX_GLOBITOS}
        </p>

        <div className="space-y-4">
          {globitos.map(g => (
            <div
              key={g.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={g.imagen}
                  alt={g.titulo}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{g.titulo}</p>
                  <p className="text-xs text-gray-500">
                    {g.eliminado ? "Inactivo" : "Activo"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleGlobito(g)}
                className={`px-4 py-1 rounded text-sm ${
                  g.eliminado
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {g.eliminado ? "Activar" : "Desactivar"}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
