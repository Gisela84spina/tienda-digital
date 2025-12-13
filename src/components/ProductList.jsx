
import ProductCard from './ProductCard'

export default function ProductList({ productos, agregarAlCarrito }) {
  return (
    <section className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
        />
      ))}
    </section>
  )
}
