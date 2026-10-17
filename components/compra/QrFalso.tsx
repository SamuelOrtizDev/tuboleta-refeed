/**
 * Código QR de mentira: una cuadrícula de 25×25 con los tres cuadros de las
 * esquinas y módulos que salen de un hash del texto. No se puede escanear.
 */

const N = 25;

function hash(texto: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** ¿El módulo (x, y) cae dentro de uno de los tres cuadros de esquina (con margen)? */
function enEsquina(x: number, y: number) {
  const zona = (cx: number, cy: number) => x >= cx && x < cx + 8 && y >= cy && y < cy + 8;
  return zona(0, 0) || zona(N - 8, 0) || zona(0, N - 8);
}

function cuadroEsquina(cx: number, cy: number) {
  // Anillo exterior 7×7, hueco 5×5 y centro 3×3 (regla evenodd).
  return `M${cx} ${cy}h7v7h-7z M${cx + 1} ${cy + 1}v5h5v-5z M${cx + 2} ${cy + 2}h3v3h-3z`;
}

export default function QrFalso({ texto, className = "" }: { texto: string; className?: string }) {
  let semilla = hash(texto);
  let d = cuadroEsquina(0, 0) + cuadroEsquina(N - 7, 0) + cuadroEsquina(0, N - 7);

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (enEsquina(x, y)) continue;
      // Generador xorshift a partir de la semilla: determinista.
      semilla ^= semilla << 13;
      semilla ^= semilla >>> 17;
      semilla ^= semilla << 5;
      semilla >>>= 0;
      if (semilla % 100 < 47) d += `M${x} ${y}h1v1h-1z`;
    }
  }

  return (
    <svg
      viewBox={`-2 -2 ${N + 4} ${N + 4}`}
      role="img"
      aria-label="Código QR de ejemplo (no es válido)"
      className={className}
      shapeRendering="crispEdges"
    >
      <rect x="-2" y="-2" width={N + 4} height={N + 4} fill="#ffffff" />
      <path d={d} fill="#141414" fillRule="evenodd" />
    </svg>
  );
}
