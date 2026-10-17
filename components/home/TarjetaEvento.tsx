import Link from "next/link";
import PosterEvento from "@/components/ui/PosterEvento";
import { type Evento, precioDesde, tituloTarjeta } from "@/data/events";
import { formatearPrecio, partesFecha } from "@/lib/formato";

type Props = {
  evento: Evento;
  /** La tarjeta grande del mosaico ocupa dos filas y estira el afiche. */
  grande?: boolean;
  mostrarPrecio?: boolean;
};

/** Tarjeta gris con afiche cuadrado, título en mayúsculas y fecha azul a la derecha. */
export default function TarjetaEvento({ evento, grande = false, mostrarPrecio = false }: Props) {
  const f = partesFecha(evento.fecha);

  return (
    <Link
      href={`/evento/${evento.slug}`}
      className="group flex h-full w-full flex-col bg-gris-claro p-3.5 transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] focus-visible:shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
    >
      <PosterEvento
        evento={evento}
        className={grande ? "aspect-square w-full lg:aspect-auto lg:min-h-0 lg:flex-1" : "aspect-square w-full"}
      />

      <div
        className={`flex items-start justify-between gap-3 pt-5 pb-1 ${grande ? "" : "flex-1"}`}
      >
        <div className="min-w-0">
          <h3
            className={`font-bold uppercase leading-tight text-tinta group-hover:underline ${grande ? "text-lg" : "text-[15px]"}`}
          >
            {tituloTarjeta(evento)}
          </h3>
          <p className="mt-1 text-sm text-gris-texto">{evento.lugar}</p>
          <p className="text-sm text-gris-texto">{evento.ciudad}</p>
          {mostrarPrecio && (
            <p className="mt-2 text-sm text-tinta">
              Desde{" "}
              <span className="font-bold">{formatearPrecio(precioDesde(evento))}</span>
            </p>
          )}
        </div>
        <p className="flex shrink-0 flex-col items-center leading-tight text-azul">
          <span className="text-xl font-bold">{f.dia}</span>
          <span className="text-xs font-semibold">{f.mesCorto}</span>
          <span className="text-xs">{f.diaSemanaCorto}</span>
        </p>
      </div>
    </Link>
  );
}
