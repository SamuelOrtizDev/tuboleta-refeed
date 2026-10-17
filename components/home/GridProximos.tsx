import Link from "next/link";
import TarjetaEvento from "./TarjetaEvento";
import {
  type Categoria,
  type Evento,
  NOMBRES_CATEGORIA,
} from "@/data/events";

type Props = {
  eventos: Evento[];
  categoria: Categoria | null;
  busqueda: string;
};

const filtros: { valor: Categoria | null; nombre: string }[] = [
  { valor: null, nombre: "Todos" },
  ...(Object.keys(NOMBRES_CATEGORIA) as Categoria[]).map((c) => ({
    valor: c,
    nombre: NOMBRES_CATEGORIA[c],
  })),
];

/** Grilla "Próximos eventos" con filtros por categoría y resultado de búsqueda. */
export default function GridProximos({ eventos, categoria, busqueda }: Props) {
  const hayBusqueda = busqueda.length > 0;

  return (
    <section id="proximos" aria-labelledby="titulo-proximos" className="mt-14 scroll-mt-6">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id="titulo-proximos" className="text-3xl font-extrabold text-tinta lg:text-[34px]">
          {hayBusqueda ? `Resultados para “${busqueda}”` : "Próximos eventos"}
        </h2>
        <ul className="flex flex-wrap gap-2" aria-label="Filtrar por categoría">
          {filtros.map((f) => {
            const activo = f.valor === categoria && !hayBusqueda;
            return (
              <li key={f.nombre}>
                <Link
                  href={f.valor ? `/?categoria=${f.valor}#proximos` : "/#proximos"}
                  aria-current={activo ? "page" : undefined}
                  className={`block rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    activo
                      ? "border-azul bg-azul text-white"
                      : "border-gris-borde bg-white text-tinta hover:border-azul hover:text-azul"
                  }`}
                >
                  {f.nombre}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {eventos.length === 0 ? (
        <div className="rounded bg-gris-claro px-6 py-12 text-center">
          <p className="text-lg font-semibold">No encontramos eventos con esa búsqueda.</p>
          <Link href="/#proximos" className="mt-3 inline-block font-semibold text-azul underline">
            Ver todos los eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventos.map((e) => (
            <TarjetaEvento key={e.slug} evento={e} mostrarPrecio />
          ))}
        </div>
      )}

      {hayBusqueda && eventos.length > 0 && (
        <Link href="/#proximos" className="mt-6 inline-block font-semibold text-azul underline">
          Limpiar búsqueda y ver todos los eventos
        </Link>
      )}
    </section>
  );
}
