import { Routes, Route } from "react-router-dom";
import VerProductos from "./VerProductos";
import AgregarProducto from "./AgregarProducto";
import EditarProducto from "./EditarProducto";
import DashboardInicio from "./DashboardInicio";
import CarruselAdmin from "../components/CarruselAdmin";



export default function AdminRoutes({
  productos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  restaurarProducto
}) {
  return (
    <Routes>
      <Route index element={<DashboardInicio productos={productos}/>} 
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
        element={
          <EditarProducto
            productos={productos}
            actualizarProducto={actualizarProducto}
          />
        }
      />
      <Route path="carrusel" element={<CarruselAdmin />} />

    </Routes>
  );
}
