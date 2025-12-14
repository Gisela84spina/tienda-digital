import { useState, useEffect } from "react";

export function useCarrusel() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("carrusel")) || [];
      setImagenes(
        data.filter(img => typeof img === "object" && img.url)
      );
      
    } catch {
      setImagenes([]);
    }
  }, []);

  const guardar = (lista) => {
    setImagenes(lista);
    localStorage.setItem("carrusel", JSON.stringify(lista));
  };

  const agregar = (img) => {
    guardar([...imagenes, img]);
  };

  const eliminar = (id) => {
    guardar(imagenes.filter(img => img.id !== id));
  };

  return { imagenes, agregar, eliminar };
}
