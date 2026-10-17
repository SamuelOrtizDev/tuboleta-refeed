import type { Metadata } from "next";
import PasoConfirmacion from "@/components/compra/PasoConfirmacion";

export const metadata: Metadata = { title: "Compra exitosa" };

export default function ConfirmacionPage() {
  return <PasoConfirmacion />;
}
