import BannerPromo from "@/components/home/BannerPromo";
import GridProximos from "@/components/home/GridProximos";
import MosaicoDestacados from "@/components/home/MosaicoDestacados";
import LimpiarCompraTerminada from "@/components/home/LimpiarCompraTerminada";
import {
  type Categoria,
  NOMBRES_CATEGORIA,
  eventosPorFecha,
} from "@/data/events";
import { normalizar } from "@/lib/formato";

const esCategoria = (v: unknown): v is Categoria =>
  typeof v === "string" && v in NOMBRES_CATEGORIA;

export default async function Home({ searchParams }: PageProps<"/">) {
  const params = await searchParams;
  const busqueda = typeof params.q === "string" ? params.q.trim() : "";
  const categoria = esCategoria(params.categoria) ? params.categoria : null;

  let lista = eventosPorFecha();
  if (busqueda) {
    const q = normalizar(busqueda);
    lista = lista.filter((e) =>
      normalizar(`${e.artista} ${e.gira} ${e.ciudad} ${e.lugar}`).includes(q),
    );
  } else if (categoria) {
    lista = lista.filter((e) => e.categoria === categoria);
  }

  return (
    <div className="mx-auto max-w-[1560px] px-4 pt-9 pb-20 lg:px-12">
      <LimpiarCompraTerminada />
      <BannerPromo />
      {busqueda ? (
        // Con búsqueda, los resultados van primero para que se vean sin bajar.
        <>
          <GridProximos eventos={lista} categoria={null} busqueda={busqueda} />
          <MosaicoDestacados />
        </>
      ) : (
        <>
          <MosaicoDestacados />
          <GridProximos eventos={lista} categoria={categoria} busqueda="" />
        </>
      )}
    </div>
  );
}
