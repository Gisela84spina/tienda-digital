import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../firebase";

export function useCarrusel() {
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const carruselRef = collection(db, "carrusel");

  const cargar = async () => {
    setLoading(true);
    const q = query(carruselRef, orderBy("orden", "asc"));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setImagenes(data);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, []);

  const agregar = async (url) => {
    await addDoc(carruselRef, {
      url,
      orden: imagenes.length + 1,
      createdAt: new Date()
    });
    cargar();
  };

  const eliminar = async (id) => {
    await deleteDoc(doc(db, "carrusel", id));
    cargar();
  };

  return { imagenes, loading, agregar, eliminar };
}
