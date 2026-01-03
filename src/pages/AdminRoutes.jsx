
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import VerProductos from "../pages/VerProductos";
import AgregarProducto from "../pages/AgregarProducto";
import EditarProducto from "../pages/EditarProducto";
import CarruselAdmin from "../components/CarruselAdmin";
import AdminGlobitos from "../pages/AdminGlobitos";


export default function AdminRoutes({
  productos,
  agregarProducto,
  eliminarProducto,
  restaurarProducto,
}) {
  return (
    <ProtectedRoute>
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
        path="/carruseles"
        element={<CarruselAdmin productos= {productos} />}
      />

      <Route 
       path="globitos"
       element={<AdminGlobitos />} 
       />

    </Routes>
    </ProtectedRoute>
  );
}
