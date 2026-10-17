import type { Localidad } from "@/data/events";
import { textoSobre } from "@/lib/color";

type Props = {
  localidades: Localidad[];
  /** Resalta una localidad (se usa en la compra). */
  resaltada?: string | null;
  className?: string;
};

const CX = 300;
const CY = 70;
const ANGULO_INICIO = 12;
const ANGULO_FIN = 168;

const punto = (r: number, grados: number) => {
  const a = (grados * Math.PI) / 180;
  return `${(CX + r * Math.cos(a)).toFixed(1)} ${(CY + r * Math.sin(a)).toFixed(1)}`;
};

/** Media corona (anillo) entre dos radios, abierta hacia el escenario. */
function anillo(r0: number, r1: number) {
  return [
    `M ${punto(r1, ANGULO_INICIO)}`,
    `A ${r1} ${r1} 0 0 1 ${punto(r1, ANGULO_FIN)}`,
    `L ${punto(r0, ANGULO_FIN)}`,
    `A ${r0} ${r0} 0 0 0 ${punto(r0, ANGULO_INICIO)}`,
    "Z",
  ].join(" ");
}

/**
 * Mapa simplificado del recinto: escenario arriba y una media corona por
 * localidad. La más cara queda más cerca del escenario.
 */
export default function MapaLocalidades({ localidades, resaltada = null, className = "" }: Props) {
  const ordenadas = [...localidades].sort((a, b) => b.precio - a.precio);
  const grosor = Math.min(56, 210 / ordenadas.length);
  const separacion = 8;
  const radioInicial = 78;
  const radioFinal = radioInicial + ordenadas.length * (grosor + separacion);
  const alto = Math.ceil(CY + radioFinal + 12);

  return (
    <svg
      viewBox={`0 0 600 ${alto}`}
      role="img"
      aria-label={`Mapa del recinto con ${ordenadas.length} localidades`}
      className={className}
    >
      <defs>
        <pattern id="rayas-agotado" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill="#c9c4b5" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="#a8a294" strokeWidth="4" />
        </pattern>
      </defs>

      {/* Escenario */}
      <rect x={CX - 95} y={8} width={190} height={48} rx={4} fill="#c8c2ae" />
      <text
        x={CX}
        y={40}
        textAnchor="middle"
        fontSize="22"
        fontWeight="900"
        fill="#ffffff"
        letterSpacing="1"
      >
        ESCENARIO
      </text>

      {/* Primero las coronas y después las etiquetas, para que ninguna corona tape un texto. */}
      {ordenadas.map((l, i) => {
        const r0 = radioInicial + i * (grosor + separacion);
        const atenuada = resaltada !== null && resaltada !== l.id;
        return (
          <path
            key={l.id}
            d={anillo(r0, r0 + grosor)}
            fill={l.agotada ? "url(#rayas-agotado)" : l.color}
            stroke={resaltada === l.id ? "#141414" : "none"}
            strokeWidth={3}
            opacity={atenuada ? 0.3 : 1}
          />
        );
      })}
      {ordenadas.map((l, i) => {
        const r0 = radioInicial + i * (grosor + separacion);
        const r1 = r0 + grosor;
        const atenuada = resaltada !== null && resaltada !== l.id;
        const colorTexto = l.agotada ? "#4a4639" : textoSobre(l.color);
        const yTexto = CY + (r0 + r1) / 2 + 6;
        return (
          <g key={l.id} opacity={atenuada ? 0.3 : 1}>
            <text
              x={CX}
              y={yTexto}
              textAnchor="middle"
              fontSize={Math.min(18, grosor * 0.38)}
              fontWeight="800"
              fill={colorTexto}
            >
              {l.nombre.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
