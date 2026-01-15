import type { Metadata } from "next";
import InstitutionalPage from "@/modules/marketing/InstitutionalPage";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.goldpdv.com.br"),
  title: "goldPDV - O PDV completo e eficiente para sua gest?o de vendas",
  description:
    "Descubra o goldPDV: uma solu??o completa para seu caixa, com gest?o de vendas eficiente, controle de estoque inteligente e muito mais.",
  openGraph: {
    title: "goldPDV - O PDV completo e eficiente para sua gest?o de vendas",
    description:
      "Descubra o goldPDV: uma solu??o completa para seu caixa, com gest?o de vendas eficiente, controle de estoque inteligente e muito mais.",
    images: ["/goldpdv/imgpreview.jpg"],
    url: "https://www.goldpdv.com.br",
    type: "website",
  },
};

export default function Home() {
  return <InstitutionalPage />;
}
