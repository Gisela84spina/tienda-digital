
import { Routes, Route } from "react-router-dom";

import VerProductos from "../pages/VerProductos";
import AgregarProducto from "../pages/AgregarProducto";
import EditarProducto from "../pages/EditarProducto";
import CarruselAdmin from "../components/CarruselAdmin";

export default function AdminRoutes({
  productos,
  agregarProducto,
  eliminarProducto,
  restaurarProducto,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1 className="text-2xl font-bold">Panel administrador</h1>}
      />

      <Route
        path="productos"
        element={
          <VerProductos
            productos={productos}
            eliminarProducto={eliminarProducto}
            restaurarProducto={restaurarProducto}
          />
        }
      />

      <Route
        path="agregar-producto"
        element={<AgregarProducto agregarProducto={agregarProducto} />}
      />

      
      <Route
        path="editar/:id"
        element={<EditarProducto />}
      />

      <Route
        path="carrusel"
        element={<CarruselAdmin />}
      />
    </Routes>
  );
}
