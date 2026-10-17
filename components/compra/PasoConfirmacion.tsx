"use client";

import LayoutCompra from "./LayoutCompra";
import BoletaVisual from "./BoletaVisual";
import { useDatosCompra } from "./useDatosCompra";
import { Boton, BotonEnlace } from "@/components/ui/Boton";
import { IconoCheck, IconoCorreo, IconoDescargar, IconoInfo } from "@/components/ui/Iconos";
import { useCompra } from "@/context/CompraContext";
import { ordenarAsientos } from "@/lib/asientos";
import { formatearPrecio, plural } from "@/lib/formato";

/** Paso 4: compra exitosa, número de orden y boletas con QR de mentira. */
export default function PasoConfirmacion() {
  return (
    <LayoutCompra paso={4} titulo="¡Compra exitosa!">
      <Contenido />
    </LayoutCompra>
  );
}

/** "2026-10-15T15:32:00Z" → "15 de octubre de 2026, 10:32 a.m." (hora local del navegador) */
function fechaCompra(iso: string): string {
  const d = new Date(iso);
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const h = d.getHours();
  const hora = `${h % 12 === 0 ? 12 : h % 12}:${String(d.getMinutes()).padStart(2, "0")} ${h >= 12 ? "p.m." : "a.m."}`;
  return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}, ${hora}`;
}

function Contenido() {
  const { orden, usuario } = useCompra();
  const { evento, localidad, cantidad, asientos } = useDatosCompra({ deOrden: true });
  if (!orden || !evento || !localidad) return null;

  const titular = usuario?.nombre ?? "Titular";

  return (
    <div className="flex flex-col gap-10">
      {/* Mensaje de éxito y número de orden */}
      <section
        aria-labelledby="titulo-exito"
        className="overflow-hidden rounded-2xl border-2 border-exito/30 bg-white"
      >
        <div className="flex flex-col items-center gap-3 bg-exito-claro px-6 py-8 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-exito text-white">
            <IconoCheck className="text-5xl" strokeWidth={3} />
          </span>
          <h2 id="titulo-exito" className="text-2xl font-extrabold text-exito">
            Tu pago fue aprobado
          </h2>
          <p className="max-w-lg text-lg">
            Ya tienes {plural(cantidad, "boleta")} para <strong>{evento.artista}</strong>. Las puedes ver
            aquí abajo.
          </p>
        </div>
        <dl className="grid gap-5 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-base text-gris-texto">Número de orden</dt>
            <dd className="font-mono text-[30px] font-extrabold tracking-wide">{orden.numero}</dd>
          </div>
          <div>
            <dt className="text-base text-gris-texto">Fecha de compra</dt>
            <dd className="font-semibold">{fechaCompra(orden.fecha)}</dd>
          </div>
          <div>
            <dt className="text-base text-gris-texto">Medio de pago</dt>
            <dd className="font-semibold">{orden.metodoPago}</dd>
          </div>
          <div>
            <dt className="text-base text-gris-texto">Total pagado</dt>
            <dd className="text-xl font-extrabold">{formatearPrecio(orden.total)}</dd>
          </div>
          {usuario && (
            <div>
              <dt className="text-base text-gris-texto">Boletas enviadas a</dt>
              <dd className="flex items-center gap-2 font-semibold break-all">
                <IconoCorreo className="shrink-0" /> {usuario.correo}
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Boletas */}
      <section aria-labelledby="titulo-boletas">
        <h2 id="titulo-boletas" className="text-2xl font-bold">
          Tus boletas
        </h2>
        <p className="mt-2 flex items-start gap-2 text-gris-texto">
          <IconoInfo className="mt-1 shrink-0" />
          El día del evento muestra cada boleta en tu celular o impresa en la entrada.
        </p>
        <div className="mt-5 flex flex-col gap-6">
          {ordenarAsientos(asientos).map((a, i) => (
            <BoletaVisual
              key={a}
              evento={evento}
              localidad={localidad}
              asiento={a}
              numeroOrden={orden.numero}
              titular={titular}
              indice={i + 1}
              total={asientos.length}
            />
          ))}
        </div>
      </section>

      {/* Acciones */}
      <div className="flex flex-col-reverse gap-4 border-t border-gris-borde pt-8 sm:flex-row sm:justify-between print:hidden">
        <Boton variante="secundario" onClick={() => window.print()} icono={<IconoDescargar className="text-2xl" />}>
          Imprimir boletas
        </Boton>
        <BotonEnlace href="/" variante="primario">
          Volver al inicio
        </BotonEnlace>
      </div>
    </div>
  );
}
