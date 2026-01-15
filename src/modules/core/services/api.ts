import axios from "axios";
import { SESSION_STORAGE_KEY } from "@/modules/core/constants/storage";

const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3023";

const TENANT_DOMAIN_TEMPLATE =
  process.env.NEXT_PUBLIC_TENANT_DOMAIN_TEMPLATE ??
  "https://{tenant}.goldpdv.com.br";

const DEFAULT_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT ?? 15000);

const normalizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

const buildTenantBaseUrl = (tenant?: string) => {
  if (!tenant) return null;
  const template = TENANT_DOMAIN_TEMPLATE.trim();
  if (!template) return null;

  if (template.includes("{tenant}")) {
    return normalizeBaseUrl(template.replace("{tenant}", tenant));
  }

  const scheme = template.startsWith("http://") ? "http" : "https";
  const host = template.replace(/^https?:\/\//i, "");
  return normalizeBaseUrl(`${scheme}://${tenant}.${host}`);
};

const isAbsoluteUrl = (value: string) => /^https?:\/\//i.test(value);

const shouldUseTenantBase = (url: string, tenant?: string) => {
  if (!tenant) return false;
  if (!url) return true;
  if (isAbsoluteUrl(url)) return false;
  return !url.startsWith("/auth/");
};

const BASE_URL = normalizeBaseUrl(DEFAULT_API_URL);

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
});

api.interceptors.request.use((config) => {
  let session:
    | { token?: string; tenant?: { slug?: string }; warehouse?: string | null }
    | null = null;

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);

      if (raw) {
        session = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Erro ao ler session:", err);
    }
  }

  const token = session?.token;
  const tenant = session?.tenant?.slug;
  const warehouse = session?.warehouse;

  const headers = (config.headers ?? {}) as Record<string, string>;
  config.headers = headers;

  if (token) headers.Authorization = `Bearer ${token}`;
  if (tenant) headers["X-Tenant"] = tenant;
  if (warehouse) headers["X-Warehouse"] = warehouse;

  const url = typeof config.url === "string" ? config.url : "";
  if (shouldUseTenantBase(url, tenant)) {
    const tenantBase = buildTenantBaseUrl(tenant);
    if (tenantBase) {
      config.baseURL = tenantBase;
    }
  } else {
    config.baseURL = BASE_URL;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {}

      alert("Sessao expirada. Faca login novamente.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
