"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import LayoutCompra from "./LayoutCompra";
import MapaAsientos, { estilosAsiento } from "./MapaAsientos";
import { Boton, BotonEnlace } from "@/components/ui/Boton";
import {
  IconoAlerta,
  IconoCerrar,
  IconoCheck,
  IconoFlechaDer,
  IconoInfo,
  IconoVolver,
} from "@/components/ui/Iconos";
import { useCompra } from "@/context/CompraContext";
import { type Asiento, generarAsientos, nombreAsiento, ordenarAsientos } from "@/lib/asientos";
import { buscarEvento, buscarLocalidad } from "@/data/events";

/** Paso 2: elegir exactamente la cantidad de asientos en la localidad elegida. */
export default function PasoAsientos({ slug }: { slug: string }) {
  const { compra } = useCompra();
  const evento = buscarEvento(slug);
  const localidad = evento ? buscarLocalidad(evento, compra?.localidadId) : undefined;
  const cantidad = compra?.cantidad ?? 1;

  return (
    <LayoutCompra
      paso={2}
      slug={slug}
      titulo="Elige tus asientos"
      subtitulo={
        localidad && (
          <>
            Toca los asientos que quieres en la zona{" "}
            <strong className="text-tinta">{localidad.nombre}</strong>. Debes elegir{" "}
            <strong className="text-tinta">
              {cantidad === 1 ? "1 asiento" : `${cantidad} asientos`}
            </strong>
            .
          </>
        )
      }
    >
      <Contenido slug={slug} />
    </LayoutCompra>
  );
}

function Contenido({ slug }: { slug: string }) {
  const router = useRouter();
  const { compra, alternarAsiento } = useCompra();
  const [avisoLleno, setAvisoLleno] = useState(false);
  const [intentoContinuar, setIntentoContinuar] = useState(false);
  const zonaEstado = useRef<HTMLDivElement>(null);

  const evento = buscarEvento(slug)!;
  const localidad = buscarLocalidad(evento, compra?.localidadId)!;
  const filas = useMemo(() => generarAsientos(slug, localidad), [slug, localidad]);

  const cantidad = compra?.cantidad ?? 1;
  const elegidos = compra?.asientos ?? [];
  const faltan = cantidad - elegidos.length;
  const completo = faltan === 0;

  function tocar(a: Asiento) {
    if (a.ocupado) return;
    const cambio = alternarAsiento(a.id);
    setAvisoLleno(!cambio);
    setIntentoContinuar(false);
  }

  function continuar() {
    if (!completo) {
      setIntentoContinuar(true);
      zonaEstado.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    router.push("/checkout");
  }

  const textoBoletas = cantidad === 1 ? "1 asiento" : `${cantidad} asientos`;

  return (
    <div className="flex flex-col gap-6">
      {/* Mensaje de estado, siempre visible y leído por lectores de pantalla */}
      <div ref={zonaEstado} role="status" aria-live="polite">
        {avisoLleno ? (
          <Mensaje tipo="alerta">
            Ya elegiste {textoBoletas}. Para cambiar uno, primero toca un asiento azul para quitarlo.
          </Mensaje>
        ) : completo ? (
          <Mensaje tipo="exito">
            ¡Listo! Elegiste {cantidad === 1 ? "tu asiento" : `tus ${cantidad} asientos`}. Ahora puedes
            continuar al pago.
          </Mensaje>
        ) : (
          <Mensaje tipo={intentoContinuar ? "error" : "alerta"}>
            {faltan === 1 ? "Te falta elegir 1 asiento." : `Te falta elegir ${faltan} asientos.`}
            {intentoContinuar && " Elígelos en el mapa para poder continuar."}
          </Mensaje>
        )}
      </div>

      {/* Leyenda */}
      <ul aria-label="Leyenda de asientos" className="flex flex-wrap gap-x-8 gap-y-3 text-lg">
        <li className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-t-lg rounded-b-md font-bold ${estilosAsiento.disponible}`}>
            5
          </span>
          Disponible
        </li>
        <li className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-t-lg rounded-b-md ${estilosAsiento.ocupado}`}>
            <IconoCerrar className="text-xl" strokeWidth={3} />
          </span>
          Ocupado
        </li>
        <li className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-t-lg rounded-b-md font-bold ${estilosAsiento.seleccionado}`}>
            5
          </span>
          Elegido por ti
        </li>
      </ul>

      <MapaAsientos
        filas={filas}
        seleccionados={elegidos}
        nombreLocalidad={localidad.nombre}
        colorLocalidad={localidad.color}
        onTocar={tocar}
      />

      {/* Asientos elegidos */}
      <section aria-labelledby="titulo-elegidos" className="rounded-xl border border-gris-borde bg-white p-5">
        <h2 id="titulo-elegidos" className="text-xl font-bold">
          Tus asientos ({elegidos.length} de {cantidad})
        </h2>
        {elegidos.length === 0 ? (
          <p className="mt-2 text-gris-texto">Todavía no has elegido asientos.</p>
        ) : (
          <ul className="mt-3 flex flex-wrap gap-3">
            {ordenarAsientos(elegidos).map((id) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => {
                    alternarAsiento(id);
                    setAvisoLleno(false);
                  }}
                  aria-label={`Quitar ${nombreAsiento(id)}`}
                  className="flex min-h-12 items-center gap-2 rounded-full border-2 border-azul bg-azul-claro px-4 font-semibold text-azul-oscuro hover:bg-white"
                >
                  {nombreAsiento(id)}
                  <IconoCerrar className="text-xl" strokeWidth={3} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 flex items-center gap-2 text-base text-gris-texto">
          <IconoInfo className="shrink-0" /> Para quitar un asiento, tócalo otra vez en el mapa o aquí.
        </p>
      </section>

      {/* Acciones */}
      <div className="flex flex-col-reverse gap-4 border-t border-gris-borde pt-8 sm:flex-row sm:justify-between">
        <BotonEnlace href={`/evento/${slug}/compra`} icono={<IconoVolver className="text-2xl" />}>
          Volver a elegir boletas
        </BotonEnlace>
        <Boton
          onClick={continuar}
          apagadoVisual={!completo}
          iconoFinal={<IconoFlechaDer className="text-2xl" strokeWidth={3} />}
        >
          Continuar al pago
        </Boton>
      </div>
    </div>
  );
}

function Mensaje({ tipo, children }: { tipo: "exito" | "alerta" | "error"; children: React.ReactNode }) {
  const estilos = {
    exito: "border-exito/40 bg-exito-claro text-exito",
    alerta: "border-alerta/40 bg-amarillo-claro text-tinta",
    error: "border-ladrillo/50 bg-[#fdecea] text-ladrillo-oscuro",
  }[tipo];
  const Icono = tipo === "exito" ? IconoCheck : IconoAlerta;
  return (
    <p className={`flex items-center gap-3 rounded-lg border-2 p-4 text-lg font-bold ${estilos}`}>
      <Icono className="shrink-0 text-2xl" strokeWidth={tipo === "exito" ? 3 : 2} />
      <span>{children}</span>
    </p>
  );
}
