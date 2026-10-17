import { IconoCheck } from "@/components/ui/Iconos";

export const PASOS = ["Boletas", "Asientos", "Pago", "Confirmación"] as const;

/** Indicador de pasos grande: 1. Boletas → 2. Asientos → 3. Pago → 4. Confirmación. */
export default function Stepper({ actual }: { actual: 1 | 2 | 3 | 4 }) {
  return (
    <nav aria-label="Pasos de la compra" className="border-b border-gris-borde bg-white print:hidden">
      <div className="mx-auto max-w-7xl px-4 py-5">
        <p className="mb-3 text-base font-semibold text-gris-texto sm:hidden">
          Paso {actual} de {PASOS.length}: <span className="text-tinta">{PASOS[actual - 1]}</span>
        </p>
        <ol className="flex items-center">
          {PASOS.map((nombre, i) => {
            const numero = i + 1;
            const hecho = numero < actual;
            const activo = numero === actual;
            return (
              <li
                key={nombre}
                aria-current={activo ? "step" : undefined}
                className={`flex items-center ${numero < PASOS.length ? "flex-1" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold sm:h-11 sm:w-11 ${
                      hecho
                        ? "bg-exito text-white"
                        : activo
                          ? "bg-azul text-white ring-4 ring-azul/25"
                          : "border-2 border-gris-borde bg-white text-gris-texto"
                    }`}
                  >
                    {hecho ? <IconoCheck className="text-xl" strokeWidth={3} /> : numero}
                  </span>
                  <span
                    className={`hidden text-lg sm:inline ${
                      activo ? "font-extrabold text-tinta" : hecho ? "font-semibold text-exito" : "font-medium text-gris-texto"
                    }`}
                  >
                    {nombre}
                    {hecho && <span className="sr-only"> (completado)</span>}
                  </span>
                </div>
                {numero < PASOS.length && (
                  <span
                    aria-hidden="true"
                    className={`mx-3 h-1 flex-1 rounded-full sm:mx-5 ${hecho ? "bg-exito" : "bg-gris-borde"}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
