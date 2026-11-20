// Byte-range support for the audio and video downloads.
// Cloudflare Pages serves static assets without Range support (always 200),
// and Safari on iOS will not play <video>/<audio> unless the server answers
// Range requests with 206. This Function slices the static asset instead.
// The asset response carries no Content-Length, so the file (max 25 MiB on
// Pages) is read into memory to know its size.

const MEDIA = /\.(mp4|m4a|mp3|webm)$/i;

function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const [, first, last] = match;
  let start;
  let end;
  if (first === "") {
    if (last === "") return null;
    start = Math.max(size - Number(last), 0);
    end = size - 1;
  } else {
    start = Number(first);
    end = last === "" ? size - 1 : Math.min(Number(last), size - 1);
  }
  if (start > end || start >= size) return "unsatisfiable";
  return { start, end };
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!MEDIA.test(url.pathname)) {
    return env.ASSETS.fetch(request);
  }

  const asset = await env.ASSETS.fetch(new Request(url, { method: "GET" }));
  if (!asset.ok) {
    return asset;
  }

  const bytes = new Uint8Array(await asset.arrayBuffer());
  const size = bytes.byteLength;
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.delete("Content-Encoding");

  const range = request.headers.get("Range");
  const parsed = range ? parseRange(range, size) : null;

  if (!parsed) {
    headers.set("Content-Length", String(size));
    return new Response(bytes, { status: 200, headers });
  }
  if (parsed === "unsatisfiable") {
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  const { start, end } = parsed;
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(bytes.subarray(start, end + 1), { status: 206, headers });
}
