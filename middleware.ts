import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const rawHost = req.headers.get("host") ?? "";
  const hostname = rawHost.split(":")[0].toLowerCase();

  const baseHosts = new Set(["goldpdv.com.br", "www.goldpdv.com.br"]);

  if (!hostname || baseHosts.has(hostname)) {
    return NextResponse.next();
  }

  if (!hostname.endsWith(".goldpdv.com.br")) {
    return NextResponse.next();
  }

  const tenantId = hostname.replace(".goldpdv.com.br", "");

  if (!tenantId || tenantId === "www") {
    return NextResponse.next();
  }

  const res = NextResponse.next();

  // salvar tenant no cookie para ser usado no client/API
  res.cookies.set("X-Tenant", tenantId, {
    path: "/",
    httpOnly: true,
  });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
