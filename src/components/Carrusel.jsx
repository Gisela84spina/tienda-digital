import { useState, useEffect } from "react";
import { useCarrusel } from "../hooks/useCarrusel";

export default function Carrusel() {
  const { imagenes } = useCarrusel();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (imagenes.length === 0) return;

    const i = setInterval(() => {
      setIndex(prev => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(i);
  }, [imagenes.length]);

  if (!imagenes.length) return null;

  return (
    <div className="w-full h-64 mb-10 overflow-hidden rounded-xl relative">
      <img
        src={imagenes[index].url}
        className="w-full h-full object-cover"
        alt="Carrusel"
      />
    </div>
  );
}
