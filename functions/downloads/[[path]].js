// Byte-range support for the audio and video downloads.
// Cloudflare Pages serves static assets without Range support (always 200),
// and Safari on iOS will not play <video>/<audio> unless the server answers
// Range requests with 206. This Function slices the static asset instead.

const MEDIA = /\.(mp4|m4a|mp3|webm)$/i;

function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  let [, first, last] = match;
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

function sliceBody(body, start, end) {
  const reader = body.getReader();
  let position = 0;
  return new ReadableStream({
    async pull(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        const chunkStart = position;
        const chunkEnd = position + value.byteLength;
        position = chunkEnd;
        if (chunkEnd <= start) continue;
        const from = Math.max(start - chunkStart, 0);
        const to = Math.min(end + 1 - chunkStart, value.byteLength);
        controller.enqueue(value.subarray(from, to));
        if (chunkEnd > end) {
          await reader.cancel();
          controller.close();
        }
        return;
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const range = request.headers.get("Range");

  if (!MEDIA.test(url.pathname)) {
    return env.ASSETS.fetch(request);
  }

  const asset = await env.ASSETS.fetch(new Request(url, { method: "GET" }));
  const size = Number(asset.headers.get("Content-Length"));
  if (!asset.ok || !asset.body || !size) {
    return asset;
  }

  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");

  const parsed = range ? parseRange(range, size) : null;
  if (!parsed) {
    return new Response(asset.body, { status: asset.status, headers });
  }
  if (parsed === "unsatisfiable") {
    await asset.body.cancel();
    headers.set("Content-Range", `bytes */${size}`);
    headers.delete("Content-Length");
    return new Response(null, { status: 416, headers });
  }

  const { start, end } = parsed;
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  const length = end - start + 1;
  headers.set("Content-Length", String(length));
  // FixedLengthStream keeps Content-Length on the response (no chunked encoding).
  const { readable, writable } = new FixedLengthStream(length);
  sliceBody(asset.body, start, end).pipeTo(writable);
  return new Response(readable, { status: 206, headers });
}
