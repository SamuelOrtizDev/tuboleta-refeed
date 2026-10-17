"use client";

import type { ReactNode } from "react";
import PosterEvento from "@/components/ui/PosterEvento";
import { useDatosCompra } from "./useDatosCompra";
import { nombreAsiento, ordenarAsientos } from "@/lib/asientos";
import { fechaLarga, formatearHora, formatearPrecio, plural } from "@/lib/formato";

const pendiente = <span className="font-medium text-gris-texto italic">Por elegir</span>;

/**
 * Resumen de compra siempre visible: evento, localidad, cantidad, asientos y total.
 * "completo" es la tarjeta lateral de escritorio; "compacto" va arriba en móvil.
 */
export default function ResumenCompra({
  variante = "completo",
  deOrden = false,
}: {
  variante?: "completo" | "compacto";
  deOrden?: boolean;
}) {
  const d = useDatosCompra({ deOrden });
  if (!d.evento) return null;
  const { evento, localidad } = d;
  const asientos = ordenarAsientos(d.asientos);

  if (variante === "compacto") {
    return (
      <section
        aria-label="Resumen de tu compra"
        className="rounded-xl border-2 border-azul/20 bg-azul-claro p-4 text-base"
      >
        <p className="font-bold">{evento.artista}</p>
        <p className="text-gris-texto">
          {fechaLarga(evento.fecha)} · {formatearHora(evento.hora)}
        </p>
        <p className="mt-2">
          {localidad ? localidad.nombre : "Localidad por elegir"} ·{" "}
          {plural(d.cantidad, "boleta")}
          {asientos.length > 0 && ` · ${asientos.map((a) => a.replace("-", "")).join(", ")}`}
        </p>
        <p className="mt-2 text-xl font-extrabold">
          Total: {localidad ? formatearPrecio(d.total) : "—"}
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="titulo-resumen"
      className="overflow-hidden rounded-xl border border-gris-borde bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
    >
      <h2 id="titulo-resumen" className="bg-marino px-5 py-3.5 text-lg font-bold text-white">
        Resumen de tu compra
      </h2>
      <div className="flex gap-4 border-b border-gris-borde p-5">
        <PosterEvento evento={evento} className="aspect-square w-20 shrink-0 rounded-md" />
        <div className="min-w-0">
          <p className="text-lg leading-snug font-bold">{evento.artista}</p>
          <p className="text-base text-gris-texto">{evento.gira}</p>
          <p className="mt-1 text-base">
            {fechaLarga(evento.fecha)}
            <br />
            {formatearHora(evento.hora)} · {evento.lugar}, {evento.ciudad}
          </p>
        </div>
      </div>

      <dl className="flex flex-col gap-3 p-5 text-base">
        <Fila etiqueta="Localidad">
          {localidad ? (
            <span className="flex items-center justify-end gap-2">
              <span
                aria-hidden="true"
                className="h-3.5 w-3.5 rounded-[3px]"
                style={{ background: localidad.color }}
              />
              {localidad.nombre}
            </span>
          ) : (
            pendiente
          )}
        </Fila>
        <Fila etiqueta="Cantidad">{plural(d.cantidad, "boleta")}</Fila>
        <Fila etiqueta="Asientos">
          {asientos.length === 0 ? (
            pendiente
          ) : (
            <span className="flex flex-col items-end">
              {asientos.map((a) => (
                <span key={a}>{nombreAsiento(a)}</span>
              ))}
              {asientos.length < d.cantidad && (
                <span className="font-medium text-alerta">
                  {d.cantidad - asientos.length === 1
                    ? "Falta 1 por elegir"
                    : `Faltan ${d.cantidad - asientos.length} por elegir`}
                </span>
              )}
            </span>
          )}
        </Fila>
      </dl>

      {localidad && (
        <div className="flex flex-col gap-2 border-t border-gris-borde p-5 text-base">
          <Fila etiqueta={`Boletas (${d.cantidad} × ${formatearPrecio(localidad.precio)})`}>
            {formatearPrecio(d.subtotal)}
          </Fila>
          <Fila etiqueta="Cargo por servicio">{formatearPrecio(d.servicio)}</Fila>
        </div>
      )}

      <div className="flex items-baseline justify-between gap-3 border-t-2 border-tinta/10 bg-gris-claro px-5 py-4">
        <span className="text-lg font-bold">{deOrden ? "Total pagado" : "Total a pagar"}</span>
        <span className="text-2xl font-extrabold">
          {localidad ? formatearPrecio(d.total) : "—"}
        </span>
      </div>
    </section>
  );
}

function Fila({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-gris-texto">{etiqueta}</dt>
      <dd className="text-right font-semibold">{children}</dd>
    </div>
  );
}
