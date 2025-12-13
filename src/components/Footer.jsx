import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-gray-300 mt-20 shadow-2xl">
      
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Marca */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Tienda Digital
          </h2>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Tu espacio online hecho a medida.  
            Simple, rápido y confiable — como un e-commerce real.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Inicio</a></li>
            <li><a href="#" className="hover:text-white transition">Productos</a></li>
            <li><a href="#" className="hover:text-white transition">Ofertas</a></li>
            <li><a href="#" className="hover:text-white transition">Carrito</a></li>
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Ayuda
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Preguntas frecuentes</a></li>
            <li><a href="#" className="hover:text-white transition">Envíos y seguimiento</a></li>
            <li><a href="#" className="hover:text-white transition">Devoluciones</a></li>
            <li><a href="#" className="hover:text-white transition">Atención al cliente</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
            Seguinos
          </h3>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-white hover:scale-110 transition-transform duration-200">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white hover:scale-110 transition-transform duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white hover:scale-110 transition-transform duration-200">
              <FaWhatsapp />
            </a>
          </div>
        </div>

      </div>

      {/* Línea final */}
      <div className="border-t border-gray-800 text-center py-5 text-sm text-gray-500">
        © {new Date().getFullYear()} Tienda Digital — Todos los derechos reservados.
      </div>

    </footer>
  );
};

export default Footer;
