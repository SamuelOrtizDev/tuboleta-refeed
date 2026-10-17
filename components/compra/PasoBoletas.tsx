"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import LayoutCompra from "./LayoutCompra";
import SelectorCantidad from "./SelectorCantidad";
import { Boton, BotonEnlace } from "@/components/ui/Boton";
import { IconoAlerta, IconoCheck, IconoFlechaDer, IconoVolver } from "@/components/ui/Iconos";
import { CANTIDAD_MAXIMA, useCompra } from "@/context/CompraContext";
import { type Evento, buscarEvento, precioTotal } from "@/data/events";
import { contarDisponibles } from "@/lib/asientos";
import { formatearPrecio, plural } from "@/lib/formato";

/** Paso 1: elegir localidad (tarjetas grandes) y cantidad (botones − y +). */
export default function PasoBoletas({ slug }: { slug: string }) {
  const evento = buscarEvento(slug)!;
  return (
    <LayoutCompra
      paso={1}
      slug={slug}
      titulo="¿Qué boletas quieres?"
      subtitulo="Elige la zona donde quieres estar y cuántas boletas necesitas."
    >
      <Contenido evento={evento} />
    </LayoutCompra>
  );
}

function Contenido({ evento }: { evento: Evento }) {
  const router = useRouter();
  const { compra, elegirLocalidad, cambiarCantidad } = useCompra();
  const [aviso, setAviso] = useState(false);
  const zonaAviso = useRef<HTMLParagraphElement>(null);

  const localidadId = compra?.localidadId ?? null;
  const localidad = evento.localidades.find((l) => l.id === localidadId);
  const cantidad = compra?.cantidad ?? 1;
  const disponibles = localidad ? contarDisponibles(evento.slug, localidad) : 0;
  const maximo = Math.max(1, Math.min(CANTIDAD_MAXIMA, disponibles));

  function elegir(id: string, disponiblesLocalidad: number) {
    elegirLocalidad(id);
    setAviso(false);
    // Si la cantidad elegida supera lo disponible en la nueva localidad, se ajusta.
    if (cantidad > disponiblesLocalidad) cambiarCantidad(disponiblesLocalidad);
  }

  function continuar() {
    if (!localidad) {
      setAviso(true);
      zonaAviso.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    router.push(`/evento/${evento.slug}/compra/asientos`);
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 1. Localidad */}
      <section aria-labelledby="titulo-localidad">
        <h2 id="titulo-localidad" className="text-2xl font-bold">
          1. Elige tu localidad
        </h2>
        <div role="radiogroup" aria-labelledby="titulo-localidad" className="mt-4 grid gap-4 sm:grid-cols-2">
          {[...evento.localidades]
            .sort((a, b) => b.precio - a.precio)
            .map((l) => {
              const quedan = contarDisponibles(evento.slug, l);
              const agotada = quedan === 0;
              const elegida = l.id === localidadId;
              return (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={elegida}
                  disabled={agotada}
                  onClick={() => elegir(l.id, quedan)}
                  className={`relative flex min-h-[132px] overflow-hidden rounded-xl border-[3px] bg-white text-left transition-colors ${
                    elegida
                      ? "border-azul bg-azul-claro shadow-[0_0_0_4px_rgba(0,109,183,0.15)]"
                      : agotada
                        ? "cursor-not-allowed border-gris-borde bg-gris-claro opacity-70"
                        : "border-gris-borde hover:border-azul/60"
                  }`}
                >
                  <span aria-hidden="true" className="w-3 shrink-0" style={{ background: l.color }} />
                  <span className="flex flex-1 flex-col gap-1 p-5">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-[22px] leading-tight font-extrabold">{l.nombre}</span>
                      {elegida && (
                        <span className="flex shrink-0 items-center gap-1 rounded-full bg-azul px-3 py-1 text-sm font-bold text-white">
                          <IconoCheck strokeWidth={3} /> Elegida
                        </span>
                      )}
                    </span>
                    {agotada ? (
                      <span className="mt-1 text-lg font-bold text-gris-texto">Agotado</span>
                    ) : (
                      <>
                        <span className="text-[26px] font-extrabold text-tinta">
                          {formatearPrecio(precioTotal(l))}
                          <span className="ml-2 text-base font-medium text-gris-texto">por boleta</span>
                        </span>
                        <span className="text-base text-gris-texto">Incluye cargo por servicio</span>
                        <span className={`mt-1 text-base font-bold ${quedan <= 10 ? "text-alerta" : "text-exito"}`}>
                          Quedan {plural(quedan, "boleta")}
                        </span>
                      </>
                    )}
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* 2. Cantidad */}
      <section aria-labelledby="titulo-cantidad">
        <h2 id="titulo-cantidad" className="text-2xl font-bold">
          2. ¿Cuántas boletas?
        </h2>
        <div className="mt-4 flex flex-col gap-5 rounded-xl border border-gris-borde bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <SelectorCantidad
            valor={cantidad}
            maximo={maximo}
            onCambiar={cambiarCantidad}
            deshabilitado={!localidad}
          />
          <div className="text-lg sm:text-right">
            {localidad ? (
              <>
                <p className="text-gris-texto">
                  {plural(cantidad, "boleta")} × {formatearPrecio(precioTotal(localidad))}
                </p>
                <p className="text-2xl font-extrabold">
                  {formatearPrecio(precioTotal(localidad) * cantidad)}
                </p>
                <p className="mt-1 text-base text-gris-texto">
                  Puedes comprar hasta {maximo} boletas.
                </p>
              </>
            ) : (
              <p className="text-gris-texto">Primero elige una localidad.</p>
            )}
          </div>
        </div>
      </section>

      {/* Acciones */}
      <div className="flex flex-col gap-4 border-t border-gris-borde pt-8">
        <p
          ref={zonaAviso}
          role="status"
          className={
            aviso
              ? "flex items-center gap-3 rounded-lg border-2 border-alerta/40 bg-amarillo-claro p-4 font-semibold"
              : "sr-only"
          }
        >
          {aviso && <IconoAlerta className="shrink-0 text-2xl text-alerta" />}
          {aviso ? "Elige una localidad para poder continuar." : ""}
        </p>
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          <BotonEnlace href={`/evento/${evento.slug}`} icono={<IconoVolver className="text-2xl" />}>
            Volver al evento
          </BotonEnlace>
          <Boton
            onClick={continuar}
            apagadoVisual={!localidad}
            iconoFinal={<IconoFlechaDer className="text-2xl" strokeWidth={3} />}
          >
            Continuar a elegir asientos
          </Boton>
        </div>
      </div>
    </div>
  );
}
