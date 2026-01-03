import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export function useCarrusel() {
  const [carruseles, setCarruseles] = useState([]);
  const [loading, setLoading] = useState(true);

  const ref = collection(db, "carrusel");

  const cargar = async () => {
    setLoading(true);
    const q = query(ref, orderBy("orden", "asc"));
    const snap = await getDocs(q);

    const data = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(c => !c.eliminado);

    setCarruseles(data);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  const agregarCarrusel = async (data) => {
    await addDoc(ref, {
      ...data,
      eliminado: false,
      createdAt: new Date()
    });
    cargar();
  };

  const actualizarCarrusel = async (id, data) => {
    await updateDoc(doc(db, "carrusel", id), data);
    cargar();
  };

  const eliminarCarrusel = async (id) => {
    await updateDoc(doc(db, "carrusel", id), { eliminado: true });
    cargar();
  };

  const moverCarrusel = async (carrusel, direccion) => {
    const indice = carruseles.findIndex(c => c.id === carrusel.id);
    const destino =
      direccion === "up" ? indice - 1 : indice + 1;
  
    if (destino < 0 || destino >= carruseles.length) return;
  
    const otro = carruseles[destino];
  
    await updateDoc(doc(db, "carrusel", carrusel.id), {
      orden: otro.orden
    });
  
    await updateDoc(doc(db, "carrusel", otro.id), {
      orden: carrusel.orden
    });
  
    cargar();
  };
  

  return {
    carruseles,
    loading,
    agregarCarrusel,
    actualizarCarrusel,
    eliminarCarrusel,
    moverCarrusel
  };
}
