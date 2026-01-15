import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import {
  Barcode,
  Boxes,
  FileText,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import LoginCard from "@/modules/auth/components/LoginCard";

const displayFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const features = [
  {
    title: "Controle de Caixa",
    description:
      "Mantenha o controle financeiro do seu PDV com precisão e praticidade. Facilite o fechamento de caixa e evite inconsistências.",
    icon: Wallet,
  },
  {
    title: "Cadastro Automatizado de Produtos",
    description:
      "Cadastre produtos com poucos cliques: importe o XML da nota do fornecedor e agilize tudo.",
    icon: Barcode,
  },
  {
    title: "Agilidade no Atendimento",
    description:
      "Reduza o tempo de espera do cliente e aumente a satisfação com um sistema ágil e intuitivo.",
    icon: Zap,
  },
  {
    title: "Controle de Estoque",
    description:
      "Gerencie seus produtos com precisão e evite rupturas ou excessos, mantendo o estoque sempre atualizado.",
    icon: Boxes,
  },
  {
    title: "Emissão de Notas Fiscais",
    description:
      "Emita notas fiscais eletrônicas com facilidade e mantenha sua empresa em conformidade fiscal.",
    icon: FileText,
  },
  {
    title: "Análise de Lucros e Resultados",
    description:
      "Obtenha relatórios detalhados para acompanhar o desempenho do seu negócio e tomar decisões estratégicas.",
    icon: TrendingUp,
  },
] as const;

const gallery = [
  {
    src: "/goldpdv/telas/principal.jpg",
    alt: "Tela Principal do Sistema goldPDV",
    caption: "Tela Principal do Sistema",
  },
  {
    src: "/goldpdv/telas/caixa.jpg",
    alt: "Tela do Caixa",
    caption: "Caixa - Ponto de Vendas",
  },
  {
    src: "/goldpdv/telas/controledeacessos.jpg",
    alt: "Tela de Login",
    caption: "Login e controle de acessos",
  },
  {
    src: "/goldpdv/telas/cadastrodeitens.jpg",
    alt: "Tela de Cadastro Rápido de Produtos",
    caption: "Cadastro rápido de produtos",
  },
  {
    src: "/goldpdv/telas/fechamentodecaixa.jpg",
    alt: "Relatório de Fechamento de Caixa",
    caption: "Fechamento de caixa",
  },
  {
    src: "/goldpdv/telas/faturamento.jpg",
    alt: "Tela de Apuração de Lucros",
    caption: "Apuração de lucros",
  },
] as const;

const testimonials = [
  {
    quote:
      "O goldPDV tem atendido nossas empresas há mais de 10 anos. O que nos conquistou foi a segurança e o rápido atendimento da equipe na solução de problemas, fatores essenciais para nós. Somos clientes satisfeitos e recomendamos para lojas de todos os tamanhos e segmentos.",
    author: "Aderson Frota",
    role: "Lojista e Presidente da Fecomércio-AM",
  },
  {
    quote:
      "A informação é o ativo mais valioso para qualquer organização. Um software de gestão completo, atualizado e com suporte técnico eficiente é essencial para o sucesso no comércio. Encontramos tudo isso com o goldPDV em nossa loja.",
    author: "Luiz Gustavo",
    role: "Proprietário de loja de materiais de construção",
  },
  {
    quote:
      "Com o goldPDV, conseguimos reduzir o tempo de atendimento em 30%. O controle de estoque é preciso e a emissão de notas é muito rápida.",
    author: "João Silva",
    role: "Gerente de supermercado",
  },
  {
    quote:
      "Um sistema completo que atende todas as nossas necessidades, desde o cadastro de produtos até a análise de lucros. Recomendo.",
    author: "Maria Souza",
    role: "Proprietária de supermercado",
  },
] as const;

const partners = [
  { src: "/goldpdv/parceiros/inoxmanaus.png", alt: "Inox Manaus" },
  { src: "/goldpdv/parceiros/pasco.png", alt: "Pasco" },
  { src: "/goldpdv/parceiros/guarany.png", alt: "Guarany" },
  { src: "/goldpdv/parceiros/planeta_aguas.png", alt: "Planeta Águas" },
  { src: "/goldpdv/parceiros/bioflex.png", alt: "Bioflex" },
  { src: "/goldpdv/parceiros/norte_reboque.png", alt: "Norte Reboque" },
  { src: "/goldpdv/parceiros/central_parafusos.png", alt: "Central de Parafusos" },
  { src: "/goldpdv/parceiros/distribuidora_viana.png", alt: "Distribuidora Viana" },
] as const;

const whatsappMessage = encodeURIComponent(
  "Olá! Gostaria de saber mais sobre a instalação do sistema goldPDV.",
);

export default function InstitutionalPage() {
  return (
    <main
      className={`${bodyFont.className} marketing-shell min-h-screen text-[var(--marketing-forest-dark)]`}
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 marketing-grid opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_rgba(198,163,74,0.35),_transparent_70%)] blur-3xl" />
        <div className="pointer-events-none absolute left-10 top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,_rgba(233,228,213,0.9),_transparent_70%)] blur-3xl" />

        <div className="bg-[var(--marketing-forest)]">
          <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-white lg:px-8">
            <div className="flex items-center gap-3">
              <Image
                src="/goldpdv/logo.png"
                alt="goldPDV"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                priority
              />
              <div>
                <p className="text-lg font-semibold text-[var(--marketing-gold)]">
                  goldPDV
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                  ERP e PDV
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 lg:flex">
              <a href="#features" className="hover:text-white">
                Funcionalidades
              </a>
              <a href="#gallery" className="hover:text-white">
                Telas
              </a>
              <a href="#testimonials" className="hover:text-white">
                Depoimentos
              </a>
              <a href="#contact" className="hover:text-white">
                Contato
              </a>
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/login"
                className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/70"
              >
                Área do cliente
              </Link>
              <a
                href="#contact"
                className="rounded-full bg-[var(--marketing-gold)] px-5 py-2 text-sm font-semibold text-[var(--marketing-forest-dark)] shadow-lg transition hover:bg-[var(--marketing-cream)]"
              >
                Falar com especialista
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="#login"
                className="rounded-full border border-white/40 px-3 py-2 text-xs font-semibold text-white"
              >
                Login
              </a>
              <a
                href="#contact"
                className="rounded-full bg-[var(--marketing-gold)] px-3 py-2 text-xs font-semibold text-[var(--marketing-forest-dark)]"
              >
                Contato
              </a>
            </div>
          </header>
        </div>

        <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-28">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--marketing-gold)] bg-[var(--marketing-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--marketing-forest)]">
              SaaS ou instalação local
            </div>
            <div className="space-y-6">
              <h1
                className={`${displayFont.className} text-4xl leading-tight text-[var(--marketing-forest-dark)] sm:text-5xl`}
              >
                O PDV que vai transformar o seu negócio
              </h1>
              <p className="text-lg text-[var(--marketing-muted)]">
                Simplifique a gestão do seu comércio com um sistema prático,
                eficiente e completo. Otimize processos, reduza custos e venda
                mais com o goldPDV.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="rounded-full bg-[var(--marketing-forest)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[var(--marketing-forest-dark)]"
              >
                Quero saber mais
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-[var(--marketing-forest)] px-6 py-3 text-sm font-semibold text-[var(--marketing-forest)] transition hover:border-[var(--marketing-forest-dark)] hover:text-[var(--marketing-forest-dark)]"
              >
                Ver telas do sistema
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                "Controle de estoque inteligente",
                "Emissão de notas fiscais",
                "Relatórios claros e rápidos",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--marketing-border)] bg-white px-4 py-3 text-sm text-[var(--marketing-muted)] shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative marketing-float">
            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[rgba(198,163,74,0.35)] blur-3xl" />
            <div className="relative rounded-[32px] border border-[var(--marketing-border)] bg-white p-4 shadow-2xl">
              <Image
                src="/goldpdv/banner.png"
                alt="Imagem demonstrativa do Sistema goldPDV"
                width={720}
                height={520}
                className="h-auto w-full rounded-[24px] object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 rounded-2xl border border-[var(--marketing-border)] bg-white p-4 shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--marketing-forest)]">
                Gestão confiável
              </p>
              <p className="mt-2 text-sm text-[var(--marketing-muted)]">
                Equipe pronta para acompanhar a sua operação.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-forest)]">
              Por que escolher o goldPDV
            </p>
            <h2
              className={`${displayFont.className} mt-3 text-3xl text-[var(--marketing-forest-dark)]`}
            >
              Recursos desenhados para o varejo de alta performance
            </h2>
          </div>
          <a
            href="#login"
            className="text-sm font-semibold text-[var(--marketing-forest)] underline decoration-[var(--marketing-gold)] decoration-2 underline-offset-4"
          >
            Acesse sua conta
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="marketing-fade-up rounded-3xl border border-[var(--marketing-border)] bg-white p-6 shadow-lg"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--marketing-cream)] text-[var(--marketing-forest)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[var(--marketing-forest-dark)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--marketing-muted)]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="gallery" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-forest)]">
              Experiência na prática
            </p>
            <h2
              className={`${displayFont.className} mt-3 text-3xl text-[var(--marketing-forest-dark)]`}
            >
              O Sistema goldPDV é prático e eficiente
            </h2>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-[var(--marketing-forest)] px-4 py-2 text-sm font-semibold text-[var(--marketing-forest)] transition hover:border-[var(--marketing-forest-dark)] hover:text-[var(--marketing-forest-dark)]"
          >
            Agende uma demonstração
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {gallery.map((item, index) => (
            <figure
              key={item.src}
              className="marketing-fade-up rounded-3xl border border-[var(--marketing-border)] bg-white p-4 shadow-lg"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={720}
                height={480}
                className="h-48 w-full rounded-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <figcaption className="mt-4 text-sm font-semibold text-[var(--marketing-forest-dark)]">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="testimonials" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-forest)]">
              Depoimentos reais
            </p>
            <h2
              className={`${displayFont.className} mt-3 text-3xl text-[var(--marketing-forest-dark)]`}
            >
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="rounded-full bg-[var(--marketing-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--marketing-forest)]">
            Confiança construída
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="rounded-3xl border border-[var(--marketing-border)] bg-white p-6 shadow-lg"
            >
              <p className="text-sm text-[var(--marketing-muted)]">
                "{item.quote}"
              </p>
              <div className="mt-4 text-sm font-semibold text-[var(--marketing-forest-dark)]">
                {item.author}
              </div>
              <div className="text-xs text-[var(--marketing-muted)]">
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-4 pt-12 lg:px-8">
        <div className="rounded-[32px] border border-[var(--marketing-border)] bg-white px-6 py-10 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-forest)]">
                Alguns de nossos parceiros
              </p>
              <h2
                className={`${displayFont.className} mt-3 text-2xl text-[var(--marketing-forest-dark)]`}
              >
                Relacionamentos duradouros no varejo
              </h2>
            </div>
            <a
              href="#contact"
              className="text-sm font-semibold text-[var(--marketing-forest)] underline decoration-[var(--marketing-gold)] decoration-2 underline-offset-4"
            >
              Fale com nosso time
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {partners.map((partner) => (
              <div
                key={partner.src}
                className="flex items-center justify-center rounded-2xl border border-[var(--marketing-gold)] bg-white p-4"
              >
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={140}
                  height={60}
                  className="h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="login"
        className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8"
      >
        <div className="absolute inset-0 -z-10 rounded-[40px] bg-[var(--marketing-forest)]" />
        <div className="absolute inset-0 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(198,163,74,0.35),_transparent_65%)]" />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-cream)]">
              Área de login
            </p>
            <h2 className={`${displayFont.className} mt-4 text-3xl text-white`}>
              Acesse o goldPDV com segurança
            </h2>
            <p className="mt-4 text-sm text-white/80">
              Seu sistema está disponível na nuvem ou em instalação local,
              mantendo o controle do caixa, estoque e faturamento em um único
              lugar.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/85">
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                Multiempresa e suporte dedicado para cada operação.
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                Login seguro com seleção de empresa autorizada.
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3">
                Redirecionamento automático para o tenant correto.
              </div>
            </div>
          </div>
          <LoginCard compact className="max-w-lg bg-white/95" />
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-[var(--marketing-border)] bg-[var(--marketing-forest)] p-10 text-white shadow-2xl">
          <Image
            src="/goldpdv/download.jpg"
            alt="Banner promocional"
            width={1200}
            height={500}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--marketing-cream)]">
                Teste grátis sem compromisso
              </p>
              <h2 className={`${displayFont.className} mt-4 text-3xl text-white`}>
                Pronto para levar seu comércio a um novo nível?
              </h2>
              <p className="mt-4 text-sm text-white/80">
                Nos chame no WhatsApp e ative o seu goldPDV ainda hoje.
              </p>
            </div>
            <a
              href={`https://wa.me/5592981675817?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[var(--marketing-gold)] px-8 py-4 text-sm font-semibold text-[var(--marketing-forest-dark)] shadow-lg transition hover:bg-[var(--marketing-cream)]"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--marketing-border)] bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-[var(--marketing-muted)] lg:flex-row lg:items-center lg:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/goldpdv/logo.png"
              alt="goldPDV"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span>goldPDV - Todos os direitos reservados.</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-[var(--marketing-forest)]">
            <span>ERP</span>
            <span>PDV</span>
            <span>Gestão comercial</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
