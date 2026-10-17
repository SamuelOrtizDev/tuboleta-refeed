"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LayoutCompra from "./LayoutCompra";
import LoaderPago from "./LoaderPago";
import Campo, { Selector } from "./Campo";
import { useDatosCompra } from "./useDatosCompra";
import { Boton, BotonEnlace } from "@/components/ui/Boton";
import {
  IconoAlerta,
  IconoBanco,
  IconoCandado,
  IconoCelular,
  IconoCheck,
  IconoTarjeta,
  IconoVolver,
} from "@/components/ui/Iconos";
import { useCompra } from "@/context/CompraContext";
import { formatearPrecio } from "@/lib/formato";

type Metodo = "tarjeta" | "pse" | "nequi";

type Datos = {
  nombre: string;
  correo: string;
  tipoDocumento: string;
  documento: string;
  celular: string;
  metodo: Metodo;
  numeroTarjeta: string;
  nombreTarjeta: string;
  vence: string;
  cvv: string;
  cuotas: string;
  banco: string;
  tipoPersona: string;
  celularNequi: string;
};

type Errores = Partial<Record<keyof Datos, string>>;

const METODOS: { id: Metodo; nombre: string; detalle: string; Icono: typeof IconoTarjeta }[] = [
  { id: "tarjeta", nombre: "Tarjeta", detalle: "Crédito o débito", Icono: IconoTarjeta },
  { id: "pse", nombre: "PSE", detalle: "Desde tu cuenta de banco", Icono: IconoBanco },
  { id: "nequi", nombre: "Nequi", detalle: "Con tu celular", Icono: IconoCelular },
];

const NOMBRE_METODO: Record<Metodo, string> = {
  tarjeta: "Tarjeta de crédito o débito",
  pse: "PSE (débito bancario)",
  nequi: "Nequi",
};

const BANCOS = ["Banco Andino", "Banco del Valle", "Banco Cafetero", "Banco Popular del Sur", "Cooperativa Central"];
const TIPOS_DOCUMENTO = ["Cédula de ciudadanía", "Cédula de extranjería", "Pasaporte"];
const CUOTAS = ["1", "2", "3", "6", "12", "24", "36"];

const ESPERA_MS = 2000;

/** "41111111" → "4111 1111" */
const formatoTarjeta = (v: string) =>
  v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

/** "1229" → "12/29" */
const formatoVence = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};

const soloNumeros = (max: number) => (v: string) => v.replace(/\D/g, "").slice(0, max);

/** Paso 3: datos del comprador y método de pago. Todo es simulado. */
export default function PasoPago() {
  return (
    <LayoutCompra
      paso={3}
      titulo="Datos de pago"
      subtitulo="Revisa tus datos y elige cómo quieres pagar."
    >
      <Contenido />
    </LayoutCompra>
  );
}

function Contenido() {
  const router = useRouter();
  const { usuario, confirmarPago } = useCompra();
  const { evento, total } = useDatosCompra();
  const [procesando, setProcesando] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [avisoErrores, setAvisoErrores] = useState(false);
  const temporizador = useRef<number | null>(null);

  // Prellenado con los datos de la sesión. Vive solo en este componente: nada se guarda.
  const [datos, setDatos] = useState<Datos>({
    nombre: usuario?.nombre ?? "",
    correo: usuario?.correo ?? "",
    tipoDocumento: TIPOS_DOCUMENTO[0],
    documento: "",
    celular: "",
    metodo: "tarjeta",
    numeroTarjeta: "",
    nombreTarjeta: "",
    vence: "",
    cvv: "",
    cuotas: "1",
    banco: "",
    tipoPersona: "Persona natural",
    celularNequi: "",
  });

  useEffect(() => () => {
    if (temporizador.current) window.clearTimeout(temporizador.current);
  }, []);

  const totalTexto = formatearPrecio(total);

  function cambiar<K extends keyof Datos>(campo: K, valor: Datos[K]) {
    setDatos((d) => ({ ...d, [campo]: valor }));
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: undefined }));
  }

  function validar(): Errores {
    const falta = "Escribe este dato.";
    const e: Errores = {};
    if (!datos.nombre.trim()) e.nombre = falta;
    if (!datos.correo.trim()) e.correo = falta;
    if (!datos.documento.trim()) e.documento = falta;
    if (!datos.celular.trim()) e.celular = falta;
    if (datos.metodo === "tarjeta") {
      if (!datos.numeroTarjeta.trim()) e.numeroTarjeta = falta;
      if (!datos.nombreTarjeta.trim()) e.nombreTarjeta = falta;
      if (!datos.vence.trim()) e.vence = falta;
      if (!datos.cvv.trim()) e.cvv = falta;
    }
    if (datos.metodo === "pse" && !datos.banco) e.banco = "Elige tu banco.";
    if (datos.metodo === "nequi" && !datos.celularNequi.trim()) e.celularNequi = falta;
    return e;
  }

  function pagar() {
    const e = validar();
    setErrores(e);
    const primero = Object.keys(e)[0];
    if (primero) {
      setAvisoErrores(true);
      const campo = document.getElementById(`pago-${primero}`);
      campo?.scrollIntoView({ behavior: "smooth", block: "center" });
      campo?.focus({ preventScroll: true });
      return;
    }
    setAvisoErrores(false);
    setProcesando(true);
    temporizador.current = window.setTimeout(() => {
      confirmarPago(NOMBRE_METODO[datos.metodo], total);
      router.replace("/confirmacion");
    }, ESPERA_MS);
  }

  if (!evento) return null;

  return (
    <div className="flex flex-col gap-12">
      {/* 1. Comprador */}
      <section aria-labelledby="titulo-comprador">
        <h2 id="titulo-comprador" className="text-2xl font-bold">
          1. Tus datos
        </h2>
        <div className="mt-5 grid gap-x-6 gap-y-6 rounded-xl border border-gris-borde bg-white p-6 sm:grid-cols-2 sm:p-8">
          <Campo id="pago-nombre" etiqueta="Nombre completo" valor={datos.nombre} onCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} />
          <Campo
            id="pago-correo"
            etiqueta="Correo electrónico"
            valor={datos.correo}
            onCambiar={(v) => cambiar("correo", v)}
            error={errores.correo}
            inputMode="email"
            ayuda="Aquí te enviaremos tus boletas."
          />
          <Selector
            id="pago-tipoDocumento"
            etiqueta="Tipo de documento"
            valor={datos.tipoDocumento}
            onCambiar={(v) => cambiar("tipoDocumento", v)}
            opciones={TIPOS_DOCUMENTO}
          />
          <Campo
            id="pago-documento"
            etiqueta="Número de documento"
            valor={datos.documento}
            onCambiar={(v) => cambiar("documento", soloNumeros(12)(v))}
            error={errores.documento}
            inputMode="numeric"
          />
          <Campo
            id="pago-celular"
            etiqueta="Celular"
            valor={datos.celular}
            onCambiar={(v) => cambiar("celular", v)}
            error={errores.celular}
            inputMode="tel"
            placeholder="300 000 0000"
          />
        </div>
      </section>

      {/* 2. Método de pago */}
      <section aria-labelledby="titulo-metodo">
        <h2 id="titulo-metodo" className="text-2xl font-bold">
          2. ¿Cómo quieres pagar?
        </h2>
        <div role="radiogroup" aria-labelledby="titulo-metodo" className="mt-4 grid gap-4 sm:grid-cols-3">
          {METODOS.map(({ id, nombre, detalle, Icono }) => {
            const elegido = datos.metodo === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={elegido}
                onClick={() => cambiar("metodo", id)}
                className={`flex flex-col items-start gap-1 rounded-xl border-[3px] p-5 text-left transition-colors ${
                  elegido
                    ? "border-azul bg-azul-claro shadow-[0_0_0_4px_rgba(0,109,183,0.15)]"
                    : "border-gris-borde bg-white hover:border-azul/60"
                }`}
              >
                {/* Fila superior: ícono a la izquierda y círculo de selección a la derecha,
                    en su propio espacio para que nunca tape el texto. */}
                <span className="mb-2 flex w-full items-center justify-between">
                  <Icono className="text-3xl text-azul" />
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                      elegido ? "border-azul bg-azul text-white" : "border-gris-borde bg-white"
                    }`}
                  >
                    {elegido && <IconoCheck className="text-base" strokeWidth={3.5} />}
                  </span>
                </span>
                <span className="text-[22px] leading-tight font-extrabold">{nombre}</span>
                <span className="text-base leading-snug text-gris-texto">{detalle}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-gris-borde bg-white p-6 sm:p-8">
          {datos.metodo === "tarjeta" && (
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-3">
              <Campo
                id="pago-numeroTarjeta"
                etiqueta="Número de la tarjeta"
                valor={datos.numeroTarjeta}
                onCambiar={(v) => cambiar("numeroTarjeta", formatoTarjeta(v))}
                error={errores.numeroTarjeta}
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                className="sm:col-span-3"
              />
              <Campo
                id="pago-nombreTarjeta"
                etiqueta="Nombre como aparece en la tarjeta"
                valor={datos.nombreTarjeta}
                onCambiar={(v) => cambiar("nombreTarjeta", v.toUpperCase())}
                error={errores.nombreTarjeta}
                className="sm:col-span-3"
              />
              <Campo
                id="pago-vence"
                etiqueta="Vencimiento"
                valor={datos.vence}
                onCambiar={(v) => cambiar("vence", formatoVence(v))}
                error={errores.vence}
                inputMode="numeric"
                placeholder="MM/AA"
              />
              <Campo
                id="pago-cvv"
                etiqueta="Código de seguridad"
                valor={datos.cvv}
                onCambiar={(v) => cambiar("cvv", soloNumeros(4)(v))}
                error={errores.cvv}
                inputMode="numeric"
                placeholder="123"
                ayuda="3 números al respaldo."
              />
              <Selector
                id="pago-cuotas"
                etiqueta="Cuotas"
                valor={datos.cuotas}
                onCambiar={(v) => cambiar("cuotas", v)}
                opciones={CUOTAS}
              />
            </div>
          )}

          {datos.metodo === "pse" && (
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <Selector
                id="pago-banco"
                etiqueta="Tu banco"
                valor={datos.banco}
                onCambiar={(v) => cambiar("banco", v)}
                opciones={BANCOS}
                vacio="Elige tu banco"
                error={errores.banco}
              />
              <Selector
                id="pago-tipoPersona"
                etiqueta="Tipo de persona"
                valor={datos.tipoPersona}
                onCambiar={(v) => cambiar("tipoPersona", v)}
                opciones={["Persona natural", "Persona jurídica"]}
              />
              <p className="text-base text-gris-texto sm:col-span-2">
                Al pagar se abrirá la página de tu banco para que apruebes el pago.
              </p>
            </div>
          )}

          {datos.metodo === "nequi" && (
            <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
              <Campo
                id="pago-celularNequi"
                etiqueta="Celular registrado en Nequi"
                valor={datos.celularNequi}
                onCambiar={(v) => cambiar("celularNequi", v)}
                error={errores.celularNequi}
                inputMode="tel"
                placeholder="300 000 0000"
              />
              <p className="self-center text-base text-gris-texto">
                Recibirás una notificación en tu app Nequi para aprobar el pago.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Acciones */}
      <div className="flex flex-col gap-4 border-t border-gris-borde pt-8">
        {avisoErrores && Object.values(errores).some(Boolean) && (
          <p role="alert" className="flex items-center gap-3 rounded-lg border-2 border-ladrillo/50 bg-[#fdecea] p-4 text-lg font-bold text-ladrillo-oscuro">
            <IconoAlerta className="shrink-0 text-2xl" />
            Faltan algunos datos. Revisa los campos marcados en rojo.
          </p>
        )}
        <p className="flex items-center gap-2 text-base text-gris-texto">
          <IconoCandado className="shrink-0" /> Pago seguro. Tus datos están protegidos.
        </p>
        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
          <BotonEnlace
            href={`/evento/${evento.slug}/compra/asientos`}
            icono={<IconoVolver className="text-2xl" />}
          >
            Volver a elegir asientos
          </BotonEnlace>
          <Boton
            variante="exito"
            onClick={pagar}
            icono={<IconoCandado className="text-2xl" />}
            className="min-h-16 px-8 text-xl"
          >
            Pagar {totalTexto}
          </Boton>
        </div>
      </div>

      {procesando && <LoaderPago total={totalTexto} />}
    </div>
  );
}
