/**
 * Formatos en español de Colombia, escritos a mano para que el servidor y el
 * navegador produzcan exactamente el mismo texto (sin depender de Intl).
 */

/** 180000 → "$180.000" */
export function formatearPrecio(valor: number): string {
  const entero = Math.round(valor).toString();
  return "$" + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

const capitalizar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Partes de una fecha ISO "2026-11-21". Usa UTC para que no cambie con la zona horaria. */
export function partesFecha(iso: string) {
  const [anio, mes, dia] = iso.split("-").map(Number);
  const fecha = new Date(Date.UTC(anio, mes - 1, dia));
  const diaSemana = DIAS[fecha.getUTCDay()];
  const mesLargo = MESES[mes - 1];
  return {
    dia,
    anio,
    mesLargo,
    /** "Nov" */
    mesCorto: capitalizar(mesLargo.slice(0, 3)),
    diaSemana,
    /** "Sáb" */
    diaSemanaCorto: capitalizar(diaSemana.slice(0, 3)),
  };
}

/** "Sábado 21 de noviembre de 2026" */
export function fechaLarga(iso: string): string {
  const p = partesFecha(iso);
  return `${capitalizar(p.diaSemana)} ${p.dia} de ${p.mesLargo} de ${p.anio}`;
}

/** "21 de noviembre" */
export function fechaCorta(iso: string): string {
  const p = partesFecha(iso);
  return `${p.dia} de ${p.mesLargo}`;
}

/** "20:00" → "8:00 p.m." */
export function formatearHora(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const sufijo = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m.toString().padStart(2, "0")} ${sufijo}`;
}

/** Quita tildes y pasa a minúsculas, para comparar textos en el buscador. */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/** "1 boleta" / "2 boletas" */
export function plural(n: number, singular: string, pluralTexto?: string): string {
  return `${n} ${n === 1 ? singular : (pluralTexto ?? singular + "s")}`;
}
