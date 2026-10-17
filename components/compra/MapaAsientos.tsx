"use client";

import { Fragment } from "react";
import type { Asiento } from "@/lib/asientos";
import { IconoCerrar, IconoCheck } from "@/components/ui/Iconos";

type Props = {
  filas: Asiento[][];
  seleccionados: string[];
  nombreLocalidad: string;
  colorLocalidad: string;
  onTocar: (asiento: Asiento) => void;
};

const tamano = "h-12 w-12 sm:h-[52px] sm:w-[52px]";

/** Estilos de cada estado de asiento. La leyenda usa los mismos. */
export const estilosAsiento = {
  disponible: "border-[3px] border-azul bg-white text-azul hover:bg-azul-claro",
  ocupado: "border-[3px] border-[#bdbdbd] bg-[#d6d6d6] text-[#7a7a7a] cursor-not-allowed",
  seleccionado: "border-[3px] border-azul-oscuro bg-azul text-white shadow-[0_0_0_3px_rgba(0,109,183,0.3)]",
};

/**
 * Escenario arriba y cuadrícula de asientos grandes, con la letra de la fila a
 * ambos lados y el número dentro de cada asiento. Pasillo en la mitad.
 */
export default function MapaAsientos({
  filas,
  seleccionados,
  nombreLocalidad,
  colorLocalidad,
  onTocar,
}: Props) {
  const porFila = filas[0]?.length ?? 0;
  const pasillo = porFila >= 8 ? Math.ceil(porFila / 2) : null;

  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-base font-semibold text-gris-texto sm:hidden">
        <span aria-hidden="true">↔</span> Desliza el mapa hacia los lados para ver todos los asientos.
      </p>
      <div className="overflow-x-auto rounded-xl border border-gris-borde bg-white p-4 sm:p-8">
        <div className="mx-auto w-max">
          <div className="mx-auto mb-3 flex h-14 w-[85%] items-center justify-center rounded-b-[40px] bg-marino text-lg font-extrabold tracking-[0.3em] text-white">
            ESCENARIO
          </div>
          <p className="mb-6 flex items-center justify-center gap-2 text-base font-semibold text-gris-texto">
            <span aria-hidden="true" className="h-3.5 w-3.5 rounded-[3px]" style={{ background: colorLocalidad }} />
            Zona {nombreLocalidad}
          </p>
  
          <div role="grid" aria-label={`Asientos de ${nombreLocalidad}`} className="flex flex-col gap-2.5">
            {filas.map((fila) => (
              <div key={fila[0].fila} role="row" className="flex items-center gap-2">
                <EtiquetaFila letra={fila[0].fila} />
                {fila.map((a, i) => {
                  const elegido = seleccionados.includes(a.id);
                  const estado = a.ocupado ? "ocupado" : elegido ? "seleccionado" : "disponible";
                  return (
                    <Fragment key={a.id}>
                      {pasillo !== null && i === pasillo && <span aria-hidden="true" className="w-4 sm:w-6" />}
                      <span role="gridcell">
                        <button
                          type="button"
                          disabled={a.ocupado}
                          aria-pressed={a.ocupado ? undefined : elegido}
                          aria-label={`Fila ${a.fila}, asiento ${a.numero}${a.ocupado ? ", ocupado" : elegido ? ", elegido" : ", disponible"}`}
                          onClick={() => onTocar(a)}
                          className={`relative flex ${tamano} items-center justify-center rounded-t-xl rounded-b-md text-lg font-extrabold transition-colors ${estilosAsiento[estado]}`}
                        >
                          {a.ocupado ? <IconoCerrar className="text-2xl" strokeWidth={3} /> : a.numero}
                          {elegido && (
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-exito text-white ring-2 ring-white">
                              <IconoCheck className="text-sm" strokeWidth={4} />
                            </span>
                          )}
                        </button>
                      </span>
                    </Fragment>
                  );
                })}
                <EtiquetaFila letra={fila[0].fila} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EtiquetaFila({ letra }: { letra: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gris-claro text-lg font-extrabold text-tinta"
    >
      {letra}
    </span>
  );
}
