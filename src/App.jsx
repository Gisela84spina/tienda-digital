
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductPage from "./pages/ProductPage";
import { useCarrusel } from "./hooks/useCarrusel";


function App() {
  const WHATSAPP_NUM = "5492364539044"; // numero de celular para wsp
  const carrusel = useCarrusel();

  const [adminLogueado, setAdminLogueado] = useState(false);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // CARGAR CARRITO DESDE LOCALSTORAGE
useEffect(() => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    setCarrito(JSON.parse(guardado));
  }
}, []);

// GUARDAR CARRITO EN LOCALSTORAGE
useEffect(() => {
  if (carrito.length > 0) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    localStorage.removeItem("carrito");
  }
}, [carrito]);


//blindaje recalcula total

useEffect(() => {
  console.log("Carrito para total:", carrito);
  const nuevo = carrito.reduce(
    (acc, item) => acc + item.precio * (item.cantidad ?? 1),
    0
  );
  console.log("total calculado:", nuevo);
  setTotal(nuevo);
}, [carrito]);

  // -------------------------
  // RESTAR
  // -------------------------
  const restarDelCarrito = (producto) => {
    const id = producto.id;
  
    setCarrito(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const nueva = item.cantidad - 1;
            return nueva > 0 ? { ...item, cantidad: nueva } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };
  
  const eliminarDelCarrito = (producto) => {
    const id = producto.id;
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // -------------------------
  // AGREGAR AL CARRITO (SUMAR)
  // -------------------------
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
  
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
  
      // BLINDEO: si viene sin cantidad, le pongo 1
      return [...prev, { ...producto, cantidad: producto.cantidad ?? 1 }];
    });
  };
  
  const aumentarCantidad = (id) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };
  const enviarCarritoPorWhatsApp = () => {
    if (carrito.length === 0) return;
  
    const items = carrito
    .map(item => 
      `• ${item.nombre}\n  Cant: ${item.cantidad}\n  Unit: $${item.precio}\n  Subtotal: $${item.precio * item.cantidad}\n  Img: ${item.imagen}`
    )
    .join("\n\n");
  
  const mensaje = `Hola! Me gustaría realizar este pedido:\n\n${items}\n\nTotal: $${total}`;
  
  const url = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
  
}  
  
  

  // -------------------------
  // CARGAR PRODUCTOS
  // -------------------------
  useEffect(() => {
    const guardados = localStorage.getItem("productos");
    if (guardados) {
      const parsed = JSON.parse(guardados);

      const normalizados = parsed.map(p => ({
        ...p,
        eliminado: p.eliminado ?? false,
      }));

      setProductos(normalizados);
      localStorage.setItem("productos", JSON.stringify(normalizados));
    } else {
      const ejemplo = [
        { id: 1, nombre: "remera", precio: 1500, categoria: "ropa", imagen: "/img/remera.png", eliminado: false },
        { id: 2, nombre: "zapatilla", precio: 15300, categoria: "calzado", imagen: "/img/zapa.png", eliminado: false },
        { id: 3, nombre: "pantalon", precio: 15000, categoria: "ropa", imagen: "/img/pant.png", eliminado: false },
      ];

      setProductos(ejemplo);
      localStorage.setItem("productos", JSON.stringify(ejemplo));
    }
  }, []);

 
  


  // -------------------------
  // RENDER
  // -------------------------

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <Header
        onCartOpen={() => {}}
        cartCount={carrito.reduce((sum, item) => sum + (item.cantidad ?? 1), 0)}
      />

      <main className="flex-1">
      <Routes>
         <Route 
           path="/" 
           element={<Home productos={productos} agregarAlCarrito={agregarAlCarrito} />} 
       />

          <Route
            path="/producto/:id"
            element={<ProductPage agregarAlCarrito={agregarAlCarrito} />}
          />

<Route
  path="/cart"
  element={
    <CartPage 
      carrito={carrito}
      restarDelCarrito={restarDelCarrito}
      eliminarDelCarrito={eliminarDelCarrito}
      aumentarCantidad={aumentarCantidad}
      total={total}
      enviarCarritoPorWhatsApp={enviarCarritoPorWhatsApp}
    />
  }
/>



          <Route
          path="/login"
          element={<Login setAdminLogueado={setAdminLogueado} />}
          />

          <Route
          path="/admin/*"
          element={<ProtectedRoute setAdminLogueado={setAdminLogueado}>
           <AdminDashboard 
           productos={productos}
          agregarProducto={(p)=>{
            const nuevos = [...productos, p];
            setProductos (nuevos);
            localStorage.setItem("productos", JSON.stringify(nuevos));

          }}
        actualizarProducto={(pActualizado)=> {
          const nuevos = productos.map(p =>
            p.id===pActualizado.id ? pActualizado : p
          );
          setProductos(nuevos);
          localStorage.setItem("productos", JSON.stringify(nuevos));
        }}
      eliminarProducto={(id)=>{
        const nuevos = productos.map(p =>
          p.id===id ?  {...p, eliminado : true } : p
        );
        setProductos(nuevos);
        localStorage.setItem("productos", JSON.stringify(nuevos));
 
      }}
    restaurarProducto={(id)=>{
      const nuevos = productos.map(p =>
        p.id===id ?  {...p, eliminado : false } : p
      );
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));

    }}
          />
          
          </ProtectedRoute>
          }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
   
