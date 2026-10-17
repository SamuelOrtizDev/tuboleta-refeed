import { type Evento, precioDesde, precioTotal } from "@/data/events";
import { formatearPrecio } from "@/lib/formato";
import { IconoFlechaArriba } from "@/components/ui/Iconos";

/** Tabla "Única etapa" con localidad, aforo y precio total, como la original. */
export default function TablaLocalidades({ evento }: { evento: Evento }) {
  const ordenadas = [...evento.localidades].sort((a, b) => b.precio - a.precio);

  return (
    <div className="rounded-2xl border border-crema-borde bg-crema-tarjeta p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-bold text-marino">Única etapa</h3>
        <p className="flex items-center gap-2 text-marino">
          <span className="text-sm">desde</span>
          <span className="text-xl font-extrabold">{formatearPrecio(precioDesde(evento))}</span>
          <IconoFlechaArriba className="text-lg" />
        </p>
      </div>

      <table className="mt-5 w-full text-left text-marino">
        <thead>
          <tr className="border-b border-crema-borde text-[11px] font-bold tracking-[0.08em] uppercase">
            <th scope="col" className="pb-3">
              Localidad
            </th>
            <th scope="col" className="hidden pb-3 text-right sm:table-cell">
              Aforo
            </th>
            <th scope="col" className="pb-3 text-right">
              Precio total
            </th>
          </tr>
        </thead>
        <tbody>
          {ordenadas.map((l) => (
            <tr key={l.id} className="border-b border-crema-borde last:border-b-0">
              <td className="py-4 pr-3 align-middle">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 rounded-[3px] border border-black/20"
                    style={{ background: l.color }}
                  />
                  <span className="text-[16px] font-bold">{l.nombre}</span>
                </div>
                {l.secciones && (
                  <div className="mt-2 flex flex-wrap gap-1.5 pl-6.5">
                    {l.secciones.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-crema-borde px-2.5 py-0.5 text-xs font-bold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td className="hidden py-4 text-right align-middle text-[15px] sm:table-cell">
                {formatearPrecio(l.aforo).slice(1)}
              </td>
              <td className="py-4 pl-3 text-right align-middle">
                {l.agotada ? (
                  <span className="rounded-full bg-marino/10 px-3 py-1 text-sm font-bold">
                    Agotado
                  </span>
                ) : (
                  <>
                    <p className="text-lg font-extrabold">{formatearPrecio(precioTotal(l))}</p>
                    <p className="text-xs text-marino/75">
                      {formatearPrecio(l.precio)} + {formatearPrecio(l.servicio)} de servicio
                    </p>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
