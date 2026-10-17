import BotonComprar from "./BotonComprar";

export const SECCIONES_EVENTO = [
  { id: "como-comprar", nombre: "Cómo comprar" },
  { id: "etapas-de-venta", nombre: "Etapas de venta" },
  { id: "localidad-y-precios", nombre: "Localidad y precios" },
  { id: "el-evento", nombre: "El evento" },
  { id: "como-llegar", nombre: "Cómo llegar" },
  { id: "ten-en-cuenta", nombre: "Ten en cuenta" },
];

/** Barra crema pegajosa con anclas a cada sección y el botón "Comprar boletas". */
export default function SubnavEvento({ slug }: { slug: string }) {
  return (
    <nav
      aria-label="Secciones del evento"
      className="sticky top-0 z-30 border-b border-crema-borde bg-crema-claro"
    >
      <div className="mx-auto flex h-16 max-w-[1160px] items-center gap-4 px-4">
        <ul className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] lg:gap-3">
          {SECCIONES_EVENTO.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className="block rounded px-2 py-2 text-[15px] font-semibold text-marino/85 hover:text-ladrillo"
              >
                {s.nombre}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden shrink-0 sm:block">
          <BotonComprar slug={slug} />
        </div>
      </div>
    </nav>
  );
}
