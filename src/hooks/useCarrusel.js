
import { useState, useEffect } from "react";

export function useCarrusel() {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrusel")) || [];
    setImagenes(data);
  }, []);

  const guardar = (lista) => {
    setImagenes(lista);
    localStorage.setItem("carrusel", JSON.stringify(lista));
  };

  const agregar = (url) => {
    const nueva = { id: Date.now(), url, active: true };
    guardar([...imagenes, nueva]);
  };

  const eliminar = (id) => {
    guardar(imagenes.filter(img => img.id !== id));
  };

  const toggle = (id) => {
    guardar(
      imagenes.map(img =>
        img.id === id ? { ...img, active: !img.active } : img
      )
    );
  };

  return { imagenes, agregar, eliminar, toggle };
}
