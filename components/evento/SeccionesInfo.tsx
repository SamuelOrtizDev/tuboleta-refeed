import type { ReactNode } from "react";
import type { Evento } from "@/data/events";
import { fechaCorta, formatearHora } from "@/lib/formato";
import BotonComprar from "./BotonComprar";
import MapaLocalidades from "./MapaLocalidades";
import TablaLocalidades from "./TablaLocalidades";
import {
  IconoAlerta,
  IconoBoleta,
  IconoBus,
  IconoCarro,
  IconoCelular,
  IconoCheck,
  IconoTarjeta,
  IconoUbicacion,
} from "@/components/ui/Iconos";

function Seccion({ id, titulo, children }: { id: string; titulo: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`titulo-${id}`} className="scroll-mt-24 pt-16">
      <h2
        id={`titulo-${id}`}
        className="font-display text-[34px] leading-tight font-bold text-marino sm:text-[40px]"
      >
        {titulo}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const tarjeta = "rounded-2xl border border-crema-borde bg-crema-tarjeta";

export function ComoComprar({ evento }: { evento: Evento }) {
  const pasos = [
    { icono: <IconoBoleta />, texto: "Elige la localidad y cuántas boletas quieres." },
    { icono: <IconoUbicacion />, texto: "Escoge tus asientos en el mapa." },
    { icono: <IconoTarjeta />, texto: "Paga con tarjeta, PSE o Nequi." },
    { icono: <IconoCelular />, texto: "Recibe tus boletas en tu correo." },
  ];
  return (
    <Seccion id="como-comprar" titulo="Cómo comprar">
      <div className="grid gap-5 md:grid-cols-2">
        <div className={`${tarjeta} p-6`}>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-crema-borde text-2xl text-marino">
              <IconoTarjeta />
            </span>
            <h3 className="text-lg font-bold text-marino">Venta general</h3>
          </div>
          <div className="mt-5 h-1 rounded-full bg-ladrillo" />
          <ol className="mt-5 flex flex-col gap-4">
            {pasos.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] text-marino">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-marino text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-0.5">{p.texto}</span>
              </li>
            ))}
          </ol>
          <BotonComprar slug={evento.slug} tamano="grande" className="mt-6 w-full" />
        </div>
        <div className={`${tarjeta} p-6`}>
          <h3 className="text-lg font-bold text-marino">Puntos de venta físicos</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-marino/85">
            También puedes comprar en los puntos de venta autorizados de {evento.ciudad}, de
            lunes a sábado de 10:00 a.m. a 7:00 p.m. Ten a la mano tu documento de identidad.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-marino/85">
            Máximo 6 boletas por persona. Pagos con tarjeta débito o crédito, PSE y Nequi.
          </p>
        </div>
      </div>
    </Seccion>
  );
}

export function EtapasDeVenta({ evento }: { evento: Evento }) {
  return (
    <Seccion id="etapas-de-venta" titulo="Etapas de venta">
      <div className={`${tarjeta} flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <h3 className="text-lg font-bold text-marino">Única etapa · Venta general</h3>
          <p className="mt-1 text-[16px] text-marino/80">
            Desde hoy hasta el {fechaCorta(evento.fecha)} o hasta agotar existencias.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-exito-claro px-4 py-1.5 text-sm font-bold text-exito sm:self-auto">
          <IconoCheck /> Activa
        </span>
      </div>
    </Seccion>
  );
}

export function LocalidadYPrecios({ evento }: { evento: Evento }) {
  return (
    <Seccion id="localidad-y-precios" titulo="Localidad y precios">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className={`${tarjeta} flex flex-col overflow-hidden`}>
          <div className="flex flex-1 items-center p-5">
            <MapaLocalidades localidades={evento.localidades} className="w-full" />
          </div>
          <div className="border-t border-crema-borde p-3">
            <button
              type="button"
              className="rounded-[4px] border border-crema-borde bg-white/60 px-4 py-2.5 text-[15px] font-bold text-marino hover:bg-white"
            >
              Explorar {evento.lugar} en 3D
            </button>
          </div>
        </div>
        <TablaLocalidades evento={evento} />
      </div>
    </Seccion>
  );
}

export function ElEvento({ evento }: { evento: Evento }) {
  return (
    <Seccion id="el-evento" titulo="El evento">
      <div className="max-w-3xl space-y-4 text-[18px] leading-relaxed text-marino/90">
        {evento.descripcion.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </Seccion>
  );
}

export function ComoLlegar({ evento }: { evento: Evento }) {
  return (
    <Seccion id="como-llegar" titulo="Cómo llegar">
      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        {/* Mapa ilustrativo: cuadrícula de calles con un pin. No es un mapa real. */}
        <div
          role="img"
          aria-label={`Mapa ilustrativo de la ubicación de ${evento.lugar}`}
          className={`${tarjeta} relative min-h-64 overflow-hidden`}
          style={{
            backgroundColor: "#ece3c8",
            backgroundImage:
              "linear-gradient(#fbf8f0 6px, transparent 6px), linear-gradient(90deg, #fbf8f0 6px, transparent 6px)",
            backgroundSize: "64px 64px",
          }}
        >
          <div className="absolute top-[30%] left-[-10%] h-5 w-[120%] -rotate-12 bg-[#f6d77a]" />
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="rounded-md bg-marino px-3 py-1.5 text-sm font-bold whitespace-nowrap text-white shadow">
              {evento.lugar}
            </span>
            <IconoUbicacion className="mt-1 text-5xl text-ladrillo" strokeWidth={2.5} />
          </div>
        </div>
        <div className={`${tarjeta} flex flex-col gap-5 p-6 text-marino`}>
          <div>
            <h3 className="text-lg font-bold">{evento.lugar}</h3>
            <p className="mt-1 text-[16px] text-marino/85">{evento.direccion}</p>
          </div>
          <p className="flex gap-3 text-[16px]">
            <IconoBus className="mt-0.5 shrink-0 text-2xl" />
            Llega en transporte público. Hay paraderos a menos de 5 minutos a pie.
          </p>
          <p className="flex gap-3 text-[16px]">
            <IconoCarro className="mt-0.5 shrink-0 text-2xl" />
            Parqueadero con cupos limitados. Te recomendamos llegar con tiempo.
          </p>
        </div>
      </div>
    </Seccion>
  );
}

export function TenEnCuenta({ evento }: { evento: Evento }) {
  const reglas = [
    `Llega con tiempo: las puertas abren a las ${formatearHora(evento.apertura)}`,
    `Edad mínima: ${evento.edadMinima.toLowerCase()}. Los menores de edad deben ir acompañados de un adulto.`,
    "Presenta tu boleta en el celular o impresa y tu documento de identidad.",
    "No se permite el ingreso de alimentos, bebidas, sombrillas ni objetos cortopunzantes.",
    "Compra solo en canales oficiales. Las boletas compradas a revendedores pueden ser falsas.",
  ];
  return (
    <Seccion id="ten-en-cuenta" titulo="Ten en cuenta">
      <ul className={`${tarjeta} flex flex-col gap-4 p-6`}>
        {reglas.map((r) => (
          <li key={r} className="flex gap-3 text-[16px] text-marino">
            <IconoAlerta className="mt-0.5 shrink-0 text-xl text-ladrillo" />
            {r}
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
