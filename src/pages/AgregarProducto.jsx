import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AgregarProducto({ agregarProducto }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  
  const navigate = useNavigate();
  const CLOUD_NAME = "dy2lgqgk6";
  const UPLOAD_PRESET = "tienda_upload";
  const [subiendo, setSubiendo] = useState(false);
  const [categoria, setCategoria] = useState("");



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
      if (!res.ok) {
        throw new Error("Error en Cloudinary");
      }
      
      const data = await res.json();
      setImagen(data.secure_url);
    } catch (error) {
      alert("Error subiendo imagen");
    } finally {
      setSubiendo(false);
    }
  };
  

  const handleSubmit = (e) => {

    e.preventDefault();

    if (subiendo) {
      alert("La imagen todavía se está subiendo");
      return;
    }
    
    if (!nombre || precio <= 0) {
      alert("Completá correctamente el nombre y el precio");
      return;
    }
    
    if (!imagen) {
      alert("Esperá a que termine de subir la imagen");
      return;
    }
    if (!categoria) {
      alert("Seleccioná una categoría");
      return;
    }
    
    

  
    const nuevoProducto = {
      id: Date.now(),  // id único rápido
      nombre,
      precio: Number(precio),
      imagen,
      categoria,
      eliminado: false,
    };
  
    agregarProducto(nuevoProducto);
  
    // limpiar formulario
    setNombre("");
    setPrecio("");
    setImagen("");
    setCategoria("");
    
  
    alert("Producto agregado con éxito");
  
  
    // ACÁ vamos a agregar la lógica
    console.log("Producto listo para agregar:", { nombre, precio, imagen, categoria });
    navigate("/");
  
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-center">Agregar Producto</h2>

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
            <label className="block font-semibold mb-1">Imagen:</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImagenUpload}
              className="w-full p-2 border rounded"
            />
            {imagen && (
  <img
    src={imagen}
    alt="preview"
    className="mt-4 w-full h-40 object-cover rounded"
  />
)}

          </div>
          <div>
  <label className="block font-semibold mb-1">Categoría:</label>
  <select
    className="w-full p-2 border rounded"
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
    required
  >
    <option value="">Seleccionar categoría</option>
    <option value="ropa">Ropa</option>
    <option value="calzado">Calzado</option>
    <option value="accesorios">Accesorios</option>
  </select>
</div>


          <button
  type="submit"
  disabled={!imagen || subiendo}
  className={`w-full p-2 rounded-lg font-semibold transition
    ${subiendo || !imagen
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"}
  `}
>
  {subiendo ? "Subiendo imagen..." : "Guardar producto"}
</button>

        </form>
      </div>
    </div>
  );

}