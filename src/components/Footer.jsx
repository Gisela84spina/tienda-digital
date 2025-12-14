import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-20">
      
      {/* CONTENEDOR */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 gap-12 md:grid-cols-4">

        {/* MARCA */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Tienda Digital
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            E-commerce simple, funcional y directo.  
            Comprá fácil, consultá rápido y recibí atención real.
          </p>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Productos
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Carrito
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Contacto
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="text-gray-400">
              Atención personalizada
            </li>
            <li>
              <a
                href="https://wa.me/5492364539044"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition"
              >
                WhatsApp directo
              </a>
            </li>
          </ul>
        </div>

        {/* REDES */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Redes
          </h3>

          <div className="flex gap-5 text-2xl">
            {/* Facebook */}
            <a
              href="#" // pegá acá tu link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaFacebookF />
            </a>

            {/* Instagram */}
            <a
              href="#" // pegá acá tu link real
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white hover:scale-110 transition-transform"
            >
              <FaInstagram />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5492364539044"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-green-400 hover:scale-110 transition-transform"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

      {/* LÍNEA FINAL */}
      <div className="border-t border-gray-800 text-center py-5 text-xs text-gray-500">
        © {new Date().getFullYear()} Tienda Digital · Hecho por Gise  
        <div className="mt-1">
          Última actualización: {new Date().toLocaleDateString()}
        </div>
      </div>

    </footer>
  );
}
