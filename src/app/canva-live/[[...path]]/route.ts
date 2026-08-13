import type { NextRequest } from "next/server";

const CANVA_ORIGIN = "https://sample-wedding-the-invitationweb.canva.link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Proxies the published Canva invitation through our origin so device-frame
 * iframes can render it. Canva blocks direct embedding (X-Frame-Options / CSP).
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> },
) {
  const { path } = await context.params;
  const incoming = new URL(request.url);
  const suffix = path?.length ? path.map(encodeURIComponent).join("/") : "";
  const targetUrl = suffix
    ? `${CANVA_ORIGIN}/${suffix}${incoming.search}`
    : `${CANVA_ORIGIN}/${incoming.search}`;

  const upstream = await fetch(targetUrl, {
    headers: {
      Accept: request.headers.get("accept") ?? "*/*",
      "Accept-Language": request.headers.get("accept-language") ?? "en",
      "User-Agent":
        request.headers.get("user-agent") ??
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    redirect: "follow",
  });

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";
  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=120");
  headers.set("Content-Security-Policy", "frame-ancestors 'self'");

  if (contentType.includes("text/html")) {
    let html = await upstream.text();
    html = rewriteHtml(html);
    return new Response(html, { status: upstream.status, headers });
  }

  const buffer = await upstream.arrayBuffer();
  return new Response(buffer, { status: upstream.status, headers });
}

function rewriteHtml(html: string) {
  const proxyBase = "/canva-live";
  let out = html
    .replaceAll(CANVA_ORIGIN, proxyBase)
    .replaceAll(
      "https:\\/\\/sample-wedding-the-invitationweb.canva.link",
      "\\/canva-live",
    );

  // Canva ships <base href="/"> — force assets through our proxy
  if (/<base\s/i.test(out)) {
    out = out.replace(
      /<base\s[^>]*>/i,
      `<base href="${proxyBase}/">`,
    );
  } else {
    out = out.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${proxyBase}/">`,
    );
  }

  // Soften common frame-bust checks
  out = out.replace(
    /if\s*\(\s*top\s*!==\s*self\s*\)/gi,
    "if(false && top!==self)",
  );
  out = out.replace(
    /if\s*\(\s*window\.top\s*!==\s*window\.self\s*\)/gi,
    "if(false && window.top!==window.self)",
  );

  // Preview embed: no scrollbar lines, clip to one artboard (360×720)
  const embedCss = `<style id="protorev-preview-embed">
html,body{overflow:hidden!important;height:720px!important;max-height:720px!important;scrollbar-width:none!important;-ms-overflow-style:none!important;}
html::-webkit-scrollbar,body::-webkit-scrollbar,#root::-webkit-scrollbar,*::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;}
#root,main{overflow:hidden!important;max-height:720px!important;height:100%!important;}
</style>`;
  if (/<\/head>/i.test(out)) {
    out = out.replace(/<\/head>/i, `${embedCss}</head>`);
  } else {
    out = `${embedCss}${out}`;
  }

  return out;
}
