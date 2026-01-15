"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/modules/core/hooks/useSession";
import { redirectToTenantDomain } from "@/modules/core/utils/tenant";
import { fetchUserCompanies } from "@/modules/auth/services/authService";
import { SessionData, UserCompany } from "@/modules/core/types";

type LoginCardProps = {
  className?: string;
  compact?: boolean;
  title?: string;
  helperText?: string;
};

export default function LoginCard({
  className = "",
  compact = false,
  title,
  helperText,
}: LoginCardProps) {
  const router = useRouter();
  const {
    login,
    session,
    isLoading: isSessionLoading,
    updateWarehouse,
    logout,
  } = useSession();
  const [loginField, setLoginField] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<UserCompany[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [isCompaniesLoading, setIsCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState<string | null>(null);
  const [awaitingCompanySelection, setAwaitingCompanySelection] =
    useState(false);
  const [companiesRequested, setCompaniesRequested] = useState(false);

  const loadCompanies = useCallback(
    async (activeSession: SessionData) => {
      setCompaniesError(null);
      setIsCompaniesLoading(true);
      try {
        const list = await fetchUserCompanies();
        setCompanies(list);
        setSelectedWarehouse((prev) => prev || activeSession.warehouse || "");
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Falha ao carregar empresas autorizadas.";
        setCompaniesError(message);
      } finally {
        setIsCompaniesLoading(false);
        setCompaniesRequested(true);
      }
    },
    [],
  );

  useEffect(() => {
    if (isSessionLoading) return;

    if (session?.warehouse) {
      router.replace("/dashboard");
      return;
    }

    if (session) {
      setAwaitingCompanySelection(true);
      if (!companiesRequested && !isCompaniesLoading) {
        loadCompanies(session);
      }
    }
  }, [
    isSessionLoading,
    session,
    router,
    loadCompanies,
    companiesRequested,
    isCompaniesLoading,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setCompaniesError(null);
    setIsLoading(true);
    setCompanies([]);
    setCompaniesRequested(false);

    try {
      const sessionData = await login({ login: loginField, senha });
      const redirected = redirectToTenantDomain(sessionData.tenant);
      setAwaitingCompanySelection(true);
      setSelectedWarehouse(sessionData.warehouse ?? "");
      await loadCompanies(sessionData);
      if (redirected) {
        return;
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Falha ao autenticar";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompanySubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!session) {
      setError("Sessão inválida. Faça login novamente.");
      return;
    }
    const normalizedWarehouse = selectedWarehouse.trim();
    if (!normalizedWarehouse) {
      setCompaniesError("Selecione uma empresa para continuar.");
      return;
    }

    const chosenCompany =
      companies.find(
        (company) =>
          company.code === normalizedWarehouse ||
          company.id === normalizedWarehouse ||
          company.label === normalizedWarehouse,
      ) ?? null;

    updateWarehouse(
      normalizedWarehouse,
      chosenCompany?.label ?? normalizedWarehouse,
    );
    router.push("/dashboard");
  };

  const handleReset = () => {
    updateWarehouse(null, null);
    logout();
    setAwaitingCompanySelection(false);
    setCompanies([]);
    setSelectedWarehouse("");
    setCompaniesError(null);
    setCompaniesRequested(false);
    setLoginField("");
    setSenha("");
    setError(null);
    setIsLoading(false);
  };

  const heading = title ?? (compact ? "Acesse o goldPDV" : "Acesse sua conta");
  const footerText =
    helperText ??
    (compact
      ? "Clientes ativos entram com o e-mail corporativo e senha."
      : "Use um e-mail corporativo. O tenant é detectado automaticamente.");
  const logoSize = compact ? 40 : 48;

  return (
    <div
      className={`w-full rounded-2xl border border-[var(--marketing-border)] bg-white shadow-xl ${
        compact ? "p-6" : "p-8"
      } ${className}`}
    >
      <div className={`flex items-center gap-3 ${compact ? "mb-6" : "mb-8"}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--marketing-cream)]">
          <Image
            src="/goldpdv/logo.png"
            alt="Logotipo do goldPDV"
            width={logoSize}
            height={logoSize}
            className="h-10 w-10 object-contain"
          />
        </div>
        <div>
          <p className="text-lg font-semibold text-[var(--marketing-forest-dark)]">
            goldPDV
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--marketing-muted)]">
            Gestão comercial
          </p>
        </div>
      </div>

      <h2
        className={`${
          compact ? "text-xl" : "text-2xl"
        } font-semibold text-[var(--marketing-forest-dark)]`}
      >
        {heading}
      </h2>
      <p className="mt-2 text-sm text-[var(--marketing-muted)]">
        Informações protegidas e suporte dedicado.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--marketing-forest)]"
          >
            E-mail corporativo
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-xl border border-[var(--marketing-border)] px-4 py-2 shadow-sm focus:border-[var(--marketing-gold)] focus:ring-[var(--marketing-gold)]"
            placeholder="joao@empresa.com.br"
            value={loginField}
            onChange={(event) => setLoginField(event.target.value)}
            disabled={awaitingCompanySelection}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--marketing-forest)]"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-xl border border-[var(--marketing-border)] px-4 py-2 shadow-sm focus:border-[var(--marketing-gold)] focus:ring-[var(--marketing-gold)]"
            placeholder="********"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            disabled={awaitingCompanySelection}
            required
          />
        </div>
        {error ? (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isLoading || awaitingCompanySelection}
          className="w-full rounded-xl bg-[var(--marketing-forest)] px-4 py-3 font-semibold text-white shadow-md transition hover:bg-[var(--marketing-forest-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Entrando..." : "Login"}
        </button>
      </form>

      {awaitingCompanySelection ? (
        <div className="mt-6 border-t border-[var(--marketing-border)] pt-6">
          <form className="space-y-3" onSubmit={handleCompanySubmit}>
            <div>
              <label className="block text-sm font-medium text-[var(--marketing-forest)]">
                Empresa
              </label>
              <select
                className="mt-1 block w-full rounded-xl border border-[var(--marketing-border)] px-4 py-2 shadow-sm focus:border-[var(--marketing-gold)] focus:ring-[var(--marketing-gold)]"
                value={selectedWarehouse}
                onChange={(event) => setSelectedWarehouse(event.target.value)}
                disabled={isCompaniesLoading}
                required
              >
                <option value="">
                  {isCompaniesLoading
                    ? "Carregando empresas..."
                    : "Selecione a empresa"}
                </option>
                {companies.map((company) => {
                  const optionValue = (company.code || company.id).trim();
                  return (
                    <option key={optionValue} value={optionValue}>
                      {company.label}
                    </option>
                  );
                })}
              </select>
            </div>
            {companiesError ? (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {companiesError}
              </p>
            ) : null}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-1/3 rounded-xl border border-[var(--marketing-border)] bg-[var(--marketing-cream)] py-3 text-sm font-semibold text-[var(--marketing-forest)] transition hover:bg-white"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={isCompaniesLoading || !selectedWarehouse}
                className="flex-1 rounded-xl bg-[var(--marketing-gold)] px-4 py-3 font-semibold text-[var(--marketing-forest-dark)] shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCompaniesLoading ? "Carregando..." : "Acessar"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <p className="mt-4 text-center text-xs text-[var(--marketing-muted)]">
        {footerText}
      </p>
    </div>
  );
}
