import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function cargarProductos() {
  const q = query(
    collection(db, "productos"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
    id: doc.id,
    ...data,
    imagenes: data.imagenes?.length
    ? data.imagenes
    : data.imagenes
      ? [data.imagen]
      : []
    };
  });
}

