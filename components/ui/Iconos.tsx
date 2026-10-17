/**
 * Íconos SVG propios (trazo de 2px, 24x24). Sin librerías externas.
 * Todos aceptan className y heredan el color con currentColor.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconoBuscar = (p: P) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Base>
);

export const IconoFiltros = (p: P) => (
  <Base {...p}>
    <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
    <circle cx="16" cy="7" r="2" />
    <circle cx="10" cy="17" r="2" />
  </Base>
);

export const IconoUsuario = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </Base>
);

export const IconoFlechaAbajo = (p: P) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
);

export const IconoFlechaArriba = (p: P) => (
  <Base {...p}>
    <path d="M6 15l6-6 6 6" />
  </Base>
);

export const IconoFlechaIzq = (p: P) => (
  <Base {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Base>
);

export const IconoFlechaDer = (p: P) => (
  <Base {...p}>
    <path d="M9 18l6-6-6-6" />
  </Base>
);

export const IconoVolver = (p: P) => (
  <Base {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Base>
);

export const IconoMenu = (p: P) => (
  <Base {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Base>
);

export const IconoCerrar = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const IconoCheck = (p: P) => (
  <Base {...p}>
    <path d="M5 12.5l4.5 4.5L19 7" />
  </Base>
);

export const IconoMas = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const IconoMenos = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const IconoUbicacion = (p: P) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);

export const IconoCalendario = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Base>
);

export const IconoReloj = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const IconoPuerta = (p: P) => (
  <Base {...p}>
    <path d="M5 21h14M7 21V4.5A1.5 1.5 0 018.5 3h7A1.5 1.5 0 0117 4.5V21" />
    <path d="M14 12h.01" strokeWidth={3} />
  </Base>
);

export const IconoTarjeta = (p: P) => (
  <Base {...p}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19M6.5 15h4" />
  </Base>
);

export const IconoBanco = (p: P) => (
  <Base {...p}>
    <path d="M3 9.5L12 4l9 5.5M4.5 10v8M9.5 10v8M14.5 10v8M19.5 10v8M3 20.5h18" />
  </Base>
);

export const IconoCelular = (p: P) => (
  <Base {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
    <path d="M11 18.5h2" />
  </Base>
);

export const IconoCandado = (p: P) => (
  <Base {...p}>
    <rect x="4.5" y="10.5" width="15" height="10.5" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 018 0v3" />
  </Base>
);

export const IconoInfo = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5M12 7.5h.01" />
  </Base>
);

export const IconoAlerta = (p: P) => (
  <Base {...p}>
    <path d="M12 3.5l9.5 16.5h-19z" />
    <path d="M12 10v4.5M12 17.2h.01" />
  </Base>
);

export const IconoBoleta = (p: P) => (
  <Base {...p}>
    <path d="M3 8a2 2 0 002-2h14a2 2 0 002 2v2a2 2 0 000 4v2a2 2 0 00-2 2H5a2 2 0 00-2-2v-2a2 2 0 000-4z" />
    <path d="M14 6v12" strokeDasharray="2 2" />
  </Base>
);

export const IconoRegalo = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v8.5h14V12M12 8v12.5M12 8S10.5 3.5 8 4.5 9 8 12 8zM12 8s1.5-4.5 4-3.5S15 8 12 8z" />
  </Base>
);

export const IconoCorreo = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </Base>
);

export const IconoTelefono = (p: P) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 005.5 5.5l1.5-2 4.5 1.5V19a1.5 1.5 0 01-1.5 1.5A15.5 15.5 0 013.5 5.5 1.5 1.5 0 015 4z" />
  </Base>
);

export const IconoCompartir = (p: P) => (
  <Base {...p}>
    <circle cx="18" cy="5.5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="18.5" r="2.5" />
    <path d="M8.2 10.8l7.6-4M8.2 13.2l7.6 4" />
  </Base>
);

export const IconoDescargar = (p: P) => (
  <Base {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M4.5 20h15" />
  </Base>
);

export const IconoBus = (p: P) => (
  <Base {...p}>
    <rect x="4.5" y="3.5" width="15" height="14" rx="2.5" />
    <path d="M4.5 11h15M8 20.5v-3M16 20.5v-3M8 14.5h.01M16 14.5h.01" />
  </Base>
);

export const IconoCarro = (p: P) => (
  <Base {...p}>
    <path d="M5 16.5V12l2-5h10l2 5v4.5M3.5 12h17M6 20v-3.5M18 20v-3.5M7.5 14h.01M16.5 14h.01" />
  </Base>
);

/* Redes sociales: glifos genéricos simplificados, dibujados a mano. */
export const IconoRedFacebook = (p: P) => (
  <Base {...p}>
    <path d="M14.5 8H16V5h-2a3.5 3.5 0 00-3.5 3.5V11H8.5v3h2v7h3v-7h2.2l.5-3h-2.7V9a1 1 0 011-1z" />
  </Base>
);

export const IconoRedInstagram = (p: P) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" strokeWidth={3} />
  </Base>
);

export const IconoRedX = (p: P) => (
  <Base {...p}>
    <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" />
  </Base>
);

export const IconoRedVideo = (p: P) => (
  <Base {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
    <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
  </Base>
);

export const IconoRedMusica = (p: P) => (
  <Base {...p}>
    <path d="M14 3.5v11.5a3.5 3.5 0 11-3-3.46M14 3.5c.5 2.5 2.5 4 5 4" />
  </Base>
);
