import type { SessionData } from "@/modules/core/types";
import { SESSION_STORAGE_KEY } from "@/modules/core/constants/storage";

// Base URL for non-tenant requests (ex: login)
const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3023";

// Template used to mount tenant subdomain URLs (ex: https://{tenant}.goldpdv.com.br)
const TENANT_DOMAIN_TEMPLATE =
  process.env.NEXT_PUBLIC_TENANT_DOMAIN_TEMPLATE ??
  "https://{tenant}.goldpdv.com.br";

const DEFAULT_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 15000);

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig {
  path: string;
  method?: HttpMethod;
  data?: unknown;
  tenant?: string;
  token?: string;
  warehouse?: string | null;
  headers?: Record<string, string>;
  tenantAware?: boolean;
  timeoutMs?: number;
}

/**
 * Faz uma requisicao com as informacoes de tenant e token da sessao.
 */
export async function sessionRequest<T>(
  session: SessionData,
  config: Omit<ApiRequestConfig, "tenant" | "token">,
) {
  return apiRequest<T>({
    ...config,
    tenant: session.tenant.slug,
    token: session.token,
    warehouse: session.warehouse ?? null,
  });
}

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

const ensureLeadingSlash = (path: string) =>
  path.startsWith("/") ? path : `/${path}`;

const buildTenantBaseUrl = (tenant: string) => {
  const template = TENANT_DOMAIN_TEMPLATE.trim();
  if (!template) {
    return normalizeBaseUrl(DEFAULT_API_URL);
  }

  if (template.includes("{tenant}")) {
    return normalizeBaseUrl(template.replace("{tenant}", tenant));
  }

  const scheme = template.startsWith("http://") ? "http" : "https";
  const host = template.replace(/^https?:\/\//i, "");
  return normalizeBaseUrl(`${scheme}://${tenant}.${host}`);
};

const buildTenantUrl = (tenant: string, path: string) => {
  if (!tenant) {
    throw new Error("Tenant obrigatorio para chamada tenant-aware.");
  }

  return `${buildTenantBaseUrl(tenant)}${path}`;
};

/**
 * Funcao principal para realizar requisicoes a API.
 */
export async function apiRequest<T>({
  path,
  method = "GET",
  data,
  tenant,
  token,
  warehouse,
  headers,
  tenantAware = true,
  timeoutMs = DEFAULT_TIMEOUT,
}: ApiRequestConfig): Promise<T> {
  const normalizedPath = ensureLeadingSlash(path);

  // Constroi a URL: subdominio do tenant OU URL base padrao
  const url = tenantAware
    ? buildTenantUrl(tenant ?? "", normalizedPath)
    : `${normalizeBaseUrl(DEFAULT_API_URL)}${normalizedPath}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const handleUnauthorized = () => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (err) {
      console.error("Erro ao limpar sessao:", err);
    }
    window.alert("Sessao expirada. Faca login novamente.");
    window.location.href = "/";
  };

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(tenant ? { "X-Tenant": tenant } : {}),
        ...(warehouse ? { "X-Warehouse": warehouse } : {}),
        ...headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
    });

    const clonedResponse = response.clone();
    const rawText = await clonedResponse.text().catch(() => "");
    let responseBody: unknown = null;
    if (rawText) {
      try {
        responseBody = JSON.parse(rawText);
      } catch {
        responseBody = rawText;
      }
    }

    if (!response.ok) {
      if (response.status === 401) {
        handleUnauthorized();
      }
      console.warn("[apiRequest][error]", {
        url,
        status: response.status,
        body: responseBody,
      });
      throw new Error(
        (responseBody as Record<string, unknown>)?.message
          ? String((responseBody as Record<string, unknown>)?.message)
          : `Erro ${response.status} na API`,
      );
    }

    return (responseBody as T) ?? ({} as T);
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error(
        `Tempo limite excedido ao contactar a API (${timeoutMs}ms).`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
