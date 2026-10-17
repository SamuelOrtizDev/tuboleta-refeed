import Wordmark from "./Wordmark";
import {
  IconoCorreo,
  IconoRedFacebook,
  IconoRedInstagram,
  IconoRedMusica,
  IconoRedVideo,
  IconoRedX,
  IconoTelefono,
} from "@/components/ui/Iconos";

const columnas = [
  {
    titulo: "Tuboleta",
    enlaces: ["Quiénes somos", "Trabaja con nosotros", "Puntos de venta", "Blog"],
  },
  {
    titulo: "Ayuda",
    enlaces: ["Preguntas frecuentes", "Cómo comprar", "PQRS", "Contáctanos"],
  },
  {
    titulo: "Legal",
    enlaces: [
      "Términos y condiciones",
      "Política de tratamiento de datos",
      "Política de cookies",
      "Derecho de retracto",
    ],
  },
  {
    titulo: "Vende con nosotros",
    enlaces: ["Ventas a empresas", "Organiza tu evento", "Bono Regalo", "Pásala"],
  },
];

const redes = [
  { nombre: "Facebook", Icono: IconoRedFacebook },
  { nombre: "Instagram", Icono: IconoRedInstagram },
  { nombre: "X", Icono: IconoRedX },
  { nombre: "YouTube", Icono: IconoRedVideo },
  { nombre: "TikTok", Icono: IconoRedMusica },
];

const mediosPago = ["Visa", "Mastercard", "American Express", "PSE", "Nequi", "Efectivo"];

type Props = { variante?: "azul" | "marino" };

/** Footer completo. Ningún enlace lleva a ninguna parte (prototipo). */
export default function Footer({ variante = "azul" }: Props) {
  const fondo = variante === "azul" ? "bg-azul" : "bg-marino";
  const fondoBajo = variante === "azul" ? "bg-azul-oscuro" : "bg-black/30";

  return (
    <footer className={`${fondo} mt-auto text-white`}>
      <div className="mx-auto grid max-w-[1340px] gap-10 px-4 py-12 lg:grid-cols-[1.2fr_3fr] lg:px-6">
        <div className="flex flex-col gap-5">
          <Wordmark size={36} />
          <p className="max-w-xs text-sm leading-relaxed text-white/85">
            Vive los mejores conciertos, obras de teatro, eventos deportivos y
            planes familiares de Colombia.
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="flex items-center gap-2 hover:underline">
              <IconoTelefono className="text-lg" /> Línea de atención: (601) 000 0000
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <IconoCorreo className="text-lg" /> servicioalcliente@ejemplo.co
            </a>
          </div>
          <ul className="flex gap-3" aria-label="Redes sociales">
            {redes.map(({ nombre, Icono }) => (
              <li key={nombre}>
                <a
                  href="#"
                  aria-label={nombre}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25"
                >
                  <Icono className="text-xl" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columnas.map((col) => (
            <div key={col.titulo}>
              <h2 className="mb-4 text-base font-bold">{col.titulo}</h2>
              <ul className="flex flex-col gap-2.5 text-sm text-white/85">
                {col.enlaces.map((e) => (
                  <li key={e}>
                    <a href="#" className="hover:text-white hover:underline">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1340px] flex-wrap items-center gap-3 border-t border-white/20 px-4 py-6 lg:px-6">
        <span className="mr-2 text-sm font-semibold">Medios de pago:</span>
        {mediosPago.map((m) => (
          <span
            key={m}
            className="rounded bg-white px-2.5 py-1 text-xs font-bold text-marino"
          >
            {m}
          </span>
        ))}
      </div>

      {/* pb-13: deja espacio para la franja fija de aviso del prototipo */}
      <div className={fondoBajo}>
        <div className="mx-auto flex max-w-[1340px] flex-col gap-2 px-4 pt-5 pb-13 text-xs text-white/80 md:flex-row md:items-center md:justify-between lg:px-6">
          <p>
            Prototipo académico con fines educativos. No tiene relación con
            TuBoleta ni vende boletas reales.
          </p>
          <p>Hecho en Colombia · 2026</p>
        </div>
      </div>
    </footer>
  );
}
