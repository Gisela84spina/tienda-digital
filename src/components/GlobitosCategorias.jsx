import { Link } from "react-router-dom";

export default function GlobitosCategorias({ globitos }) {
  if (!globitos || globitos.length === 0) return null;

  return (
    <section className="my-8">
          <div className="grid grid-cols-5  gap-4  place-items-center">

          {globitos.map((g, index) => {
  const isFive = globitos.length === 5;

  let colClass = "";

  if (isFive) {
    if (index === 0) colClass = "col-start-1";
    if (index === 1) colClass = "col-start-3";
    if (index === 2) colClass = "col-start-5";
    if (index === 3) colClass = "col-start-2";
    if (index === 4) colClass = "col-start-4";
  }

  return (
    <Link
      key={g.id}
      to={`/productos?categoria=${g.categoria}`}
      className={`flex flex-col items-center text-center transition ${colClass}`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shadow-md">
        <img
          src={g.imagen}
          alt={g.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="mt-2 text-sm font-medium capitalize">
        {g.titulo}
      </span>
    </Link>
  );
})}


      </div>
    </section>
  );
}
