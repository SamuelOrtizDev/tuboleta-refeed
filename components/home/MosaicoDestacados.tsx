import TarjetaEvento from "./TarjetaEvento";
import { eventos } from "@/data/events";

/**
 * Mosaico "Destacados" como el original: una tarjeta grande a la izquierda que
 * ocupa dos filas y seis tarjetas en tres columnas.
 */
export default function MosaicoDestacados() {
  const grande = eventos.find((e) => e.destacado === "grande");
  const normales = eventos.filter((e) => e.destacado === "normal").slice(0, 6);

  return (
    <section aria-labelledby="titulo-destacados" className="mt-12">
      <h2 id="titulo-destacados" className="mb-5 text-3xl font-extrabold text-tinta lg:text-[34px]">
        Destacados
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {grande && (
          <div className="flex sm:col-span-2 lg:row-span-2">
            <TarjetaEvento evento={grande} grande />
          </div>
        )}
        {normales.map((e) => (
          <TarjetaEvento key={e.slug} evento={e} />
        ))}
      </div>
    </section>
  );
}
