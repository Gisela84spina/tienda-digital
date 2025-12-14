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
    guardar([
      ...imagenes,
      {
        id: crypto.randomUUID(),
        url,
        activo: true
      }
    ]);
  };

  const desactivar = (id) => {
    guardar(
      imagenes.map(img =>
        img.id === id ? { ...img, activo: false } : img
      )
    );
  };

  const reactivar = (id) => {
    guardar(
      imagenes.map(img =>
        img.id === id ? { ...img, activo: true } : img
      )
    );
  };

  return { imagenes, agregar, desactivar, reactivar };
}
