import type { Localidad } from "@/data/events";

/**
 * Mapa de asientos determinista: los asientos ocupados salen de un hash del
 * evento, la localidad y la posición. Siempre da el mismo resultado, así el
 * servidor y el navegador coinciden y cada toma del video se ve igual.
 */

export type Asiento = {
  /** "C-5" */
  id: string;
  fila: string;
  numero: number;
  ocupado: boolean;
};

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
/** Porcentaje aproximado de asientos ocupados. */
const OCUPACION = 34;

/** Hash FNV-1a de 32 bits. */
function hash(texto: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function generarAsientos(slug: string, localidad: Localidad): Asiento[][] {
  return Array.from({ length: localidad.filas }, (_, f) => {
    const fila = LETRAS[f];
    return Array.from({ length: localidad.asientosPorFila }, (_, n) => {
      const numero = n + 1;
      const ocupado = hash(`${slug}|${localidad.id}|${fila}|${numero}`) % 100 < OCUPACION;
      return { id: `${fila}-${numero}`, fila, numero, ocupado };
    });
  });
}

export function contarDisponibles(slug: string, localidad: Localidad): number {
  if (localidad.agotada) return 0;
  return generarAsientos(slug, localidad)
    .flat()
    .filter((a) => !a.ocupado).length;
}

/** "C-5" → { fila: "C", numero: 5 } */
export function leerAsiento(id: string) {
  const [fila, numero] = id.split("-");
  return { fila, numero: Number(numero) };
}

/** "C-5" → "Fila C, asiento 5" */
export function nombreAsiento(id: string): string {
  const { fila, numero } = leerAsiento(id);
  return `Fila ${fila}, asiento ${numero}`;
}

/** Ordena por fila y luego por número. */
export function ordenarAsientos(ids: string[]): string[] {
  return [...ids].sort((a, b) => {
    const x = leerAsiento(a);
    const y = leerAsiento(b);
    return x.fila === y.fila ? x.numero - y.numero : x.fila.localeCompare(y.fila);
  });
}
