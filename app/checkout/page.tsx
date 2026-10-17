import type { Metadata } from "next";
import PasoPago from "@/components/compra/PasoPago";

export const metadata: Metadata = { title: "Pago" };

export default function CheckoutPage() {
  return <PasoPago />;
}
