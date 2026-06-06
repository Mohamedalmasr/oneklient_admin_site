import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type BackendRouteContext = {
  params: Promise<{
    backendPath: string[];
  }>;
};

const hopByHopHeaders = new Set([
  "connection",
  "content-length",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

const getBackendBaseUrl = () =>
  (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000")
    .trim()
    .replace(/\/+$/, "");

const encodePathSegments = (segments: string[]) =>
  segments.map((segment) => encodeURIComponent(segment)).join("/");

const toBackendPath = (segments: string[]) => {
  if (segments.length === 1 && segments[0] === "health") {
    return "/health";
  }

  return `/api/${encodePathSegments(segments)}`;
};

const createForwardHeaders = (request: NextRequest) => {
  const headers = new Headers(request.headers);

  for (const header of hopByHopHeaders) {
    headers.delete(header);
  }

  headers.delete("host");
  headers.set("x-forwarded-host", request.headers.get("host") || "");
  headers.set("x-forwarded-proto", request.nextUrl.protocol.replace(":", ""));

  return headers;
};

async function proxyRequest(request: NextRequest, context: BackendRouteContext) {
  const { backendPath } = await context.params;
  const backendUrl = new URL(
    `${toBackendPath(backendPath)}${request.nextUrl.search}`,
    getBackendBaseUrl(),
  );
  const method = request.method.toUpperCase();
  const body =
    method === "GET" || method === "HEAD"
      ? undefined
      : await request.arrayBuffer();

  try {
    const upstreamResponse = await fetch(backendUrl, {
      method,
      headers: createForwardHeaders(request),
      body: body && body.byteLength > 0 ? body : undefined,
      cache: "no-store",
      redirect: "manual",
    });
    const responseHeaders = new Headers(upstreamResponse.headers);

    for (const header of hopByHopHeaders) {
      responseHeaders.delete(header);
    }

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Backend proxy error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to reach the backend API",
      },
      { status: 502 },
    );
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const PATCH = proxyRequest;
export const DELETE = proxyRequest;
export const HEAD = proxyRequest;
