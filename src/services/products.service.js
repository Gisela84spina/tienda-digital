import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export async function cargarProductos() {
  const q = query(
    collection(db, "productos"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
