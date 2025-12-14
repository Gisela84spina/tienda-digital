import { useState, useEffect } from "react";
import { useCarrusel } from "../hooks/useCarrusel";

export default function Carrusel() {
  const { imagenes } = useCarrusel();

  const activas = imagenes.filter(img => img && img.url);


  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (activas.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activas.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activas.length]);

  

  if (activas.length === 0) return null;
  if (!activas[index]) return null;


  return (
    <div className="w-full h-64 mb-10 overflow-hidden rounded-xl relative">
      <img
     
        src={activas[index].url}
        className="w-full h-full object-cover transition-all duration-500"
        alt="Carrusel"
      />

      <button
        onClick={() =>
          setIndex((prev) => (prev - 1 + activas.length) % activas.length)
        }
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setIndex((prev) => (prev + 1) % activas.length)
        }
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white px-3 py-1 rounded"
      >
        ›
      </button>
    </div>
  );
}
