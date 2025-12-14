
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminRoutes from "./AdminRoutes";



export default function AdminDashboard({
  productos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  restaurarProducto
}) {

  const navigate = useNavigate();

  // 🔐 PROTECCIÓN DE RUTA → si no está logueado, fuera del dashboard
  useEffect(() => {
    const logged = localStorage.getItem("adminLogged");
    if (logged !== "true") {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-gray-900 text-white p-4 
      md:p-6 max-h-screen overflow-y-auto
 ">

        <h2 className="text-2xl font-bold">Admin ⚙️</h2>

        <nav className="flex flex-col space-y-3 text-lg">
          <Link className="hover:text-gray-300" to="/admin">
            Dashboard
          </Link>

          <Link className="hover:text-gray-300" to="/admin/productos">
            Productos
          </Link>

          <Link className="hover:text-gray-300" to="/admin/agregar-producto">
            Agregar producto
          </Link>

          <Link className="hover:text-gray-300" to="/">
            Volver a la tienda
          </Link>
          <button
  onClick={() => {
    localStorage.removeItem("adminLogged");
    navigate("/login");
  }}
  className="text-left hover:text-red-400 mt-4"
>
  Cerrar sesión
</button>

<Link className="hover:text-gray-300" to="/admin/carrusel">
  Carrusel
</Link>


        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-4 sm:p-8">
        <AdminRoutes
          productos={productos}
          agregarProducto={agregarProducto}
          actualizarProducto={actualizarProducto}
          eliminarProducto={eliminarProducto}
          restaurarProducto={restaurarProducto}
        />
      </main>

    </div>
  );
}
