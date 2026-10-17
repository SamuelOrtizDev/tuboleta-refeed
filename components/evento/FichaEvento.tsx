import type { ReactNode } from "react";
import type { Evento } from "@/data/events";
import { formatearHora, partesFecha } from "@/lib/formato";
import {
  IconoCalendario,
  IconoPuerta,
  IconoReloj,
  IconoUbicacion,
  IconoUsuario,
} from "@/components/ui/Iconos";

/** Franja de cinco datos: lugar, fecha, hora, apertura y edad mínima. */
export default function FichaEvento({ evento }: { evento: Evento }) {
  const f = partesFecha(evento.fecha);
  const diaSemana = f.diaSemana.charAt(0).toUpperCase() + f.diaSemana.slice(1);

  return (
    <dl className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-crema-borde md:grid-cols-5">
      <Dato icono={<IconoUbicacion />} etiqueta="Lugar" className="col-span-2 md:col-span-1">
        <a
          href="#como-llegar"
          className="text-ladrillo-oscuro underline decoration-2 underline-offset-4 hover:text-ladrillo"
        >
          {evento.lugar}
        </a>
      </Dato>
      <Dato icono={<IconoCalendario />} etiqueta="Fecha" detalle={`${diaSemana} · ${f.anio}`}>
        {f.dia} de {f.mesLargo}
      </Dato>
      <Dato icono={<IconoReloj />} etiqueta="Hora">
        {formatearHora(evento.hora)}
      </Dato>
      <Dato icono={<IconoPuerta />} etiqueta="Apertura">
        {formatearHora(evento.apertura)}
      </Dato>
      <Dato icono={<IconoUsuario />} etiqueta="Edad mínima">
        {evento.edadMinima}
      </Dato>
    </dl>
  );
}

function Dato({
  icono,
  etiqueta,
  detalle,
  children,
  className = "",
}: {
  icono: ReactNode;
  etiqueta: string;
  detalle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-3 border-crema-borde p-5 not-last:border-b md:not-last:border-r md:not-last:border-b-0 ${className}`}
    >
      <span className="mt-0.5 text-[17px] text-marino/70">{icono}</span>
      <div>
        <dt className="text-xs font-bold tracking-[0.08em] text-marino/75 uppercase">
          {etiqueta}
        </dt>
        <dd className="mt-1 text-[19px] leading-snug font-bold text-marino">{children}</dd>
        {detalle && <dd className="mt-0.5 text-sm text-marino/70">{detalle}</dd>}
      </div>
    </div>
  );
}
