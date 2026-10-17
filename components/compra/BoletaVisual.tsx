import QrFalso from "./QrFalso";
import Wordmark from "@/components/layout/Wordmark";
import type { Evento, Localidad } from "@/data/events";
import { leerAsiento } from "@/lib/asientos";
import { fechaLarga, formatearHora } from "@/lib/formato";

type Props = {
  evento: Evento;
  localidad: Localidad;
  asiento: string;
  numeroOrden: string;
  titular: string;
  indice: number;
  total: number;
};

/** Boleta digital: datos del evento y del asiento a la izquierda, QR de mentira a la derecha. */
export default function BoletaVisual({
  evento,
  localidad,
  asiento,
  numeroOrden,
  titular,
  indice,
  total,
}: Props) {
  const { fila, numero } = leerAsiento(asiento);
  const codigo = `${numeroOrden}-${fila}${numero}`;

  return (
    <article
      aria-label={`Boleta ${indice} de ${total}: fila ${fila}, asiento ${numero}`}
      className="relative flex break-inside-avoid flex-col overflow-hidden rounded-2xl border border-gris-borde bg-white shadow-[0_6px_24px_rgba(0,0,0,0.08)] md:flex-row"
    >
      {/* Parte principal */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 bg-azul px-6 py-3">
          <Wordmark size={22} href={null} />
          <span className="text-sm font-semibold text-white/90">
            Boleta {indice} de {total}
          </span>
        </div>
        <div className="h-2" style={{ background: localidad.color }} />
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <p className="text-[22px] leading-tight font-extrabold">{evento.artista}</p>
            <p className="text-base text-gris-texto">{evento.gira}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-base sm:grid-cols-3">
            <Dato etiqueta="Fecha" valor={fechaLarga(evento.fecha)} ancho />
            <Dato etiqueta="Hora" valor={formatearHora(evento.hora)} />
            <Dato etiqueta="Lugar" valor={`${evento.lugar}, ${evento.ciudad}`} ancho />
            <Dato etiqueta="Puertas" valor={formatearHora(evento.apertura)} />
          </dl>
          <div className="flex flex-wrap items-stretch gap-3">
            <Grande etiqueta="Localidad" valor={localidad.nombre} />
            <Grande etiqueta="Fila" valor={fila} />
            <Grande etiqueta="Asiento" valor={String(numero)} />
          </div>
          <p className="text-base text-gris-texto">
            Titular: <span className="font-semibold text-tinta">{titular}</span>
          </p>
        </div>
      </div>

      {/* Talón con el QR, separado por una línea punteada con muescas */}
      <div className="relative flex flex-col items-center justify-center gap-2 border-t-2 border-dashed border-gris-borde bg-gris-claro/60 p-6 md:w-56 md:border-t-0 md:border-l-2">
        <span aria-hidden="true" className="absolute -top-3 -left-3 h-6 w-6 rounded-full bg-[#f7f8fa] md:-top-3 md:-left-3" />
        <span aria-hidden="true" className="absolute -top-3 -right-3 h-6 w-6 rounded-full bg-[#f7f8fa] md:top-auto md:-bottom-3 md:-left-3 md:right-auto" />
        <QrFalso texto={codigo} className="h-36 w-36 rounded-md" />
        <p className="font-mono text-sm font-semibold tracking-wide">{codigo}</p>
        <p className="text-center text-xs text-gris-texto">Código de ejemplo, no válido</p>
      </div>
    </article>
  );
}

function Dato({ etiqueta, valor, ancho = false }: { etiqueta: string; valor: string; ancho?: boolean }) {
  return (
    <div className={ancho ? "col-span-2" : ""}>
      <dt className="text-xs font-bold tracking-wider text-gris-texto uppercase">{etiqueta}</dt>
      <dd className="font-semibold">{valor}</dd>
    </div>
  );
}

function Grande({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="rounded-lg border-2 border-tinta/10 px-4 py-2">
      <p className="text-xs font-bold tracking-wider text-gris-texto uppercase">{etiqueta}</p>
      <p className="text-2xl font-extrabold">{valor}</p>
    </div>
  );
}
