// Cloudflare Pages Function for POST /api/contact.
// Same behaviour as contact-api/server.mjs (honeypot, validation, Resend),
// using Resend's REST API so it needs no Node dependencies.
// Settings: RESEND_API_KEY (secret), RESEND_FROM_EMAIL, CONTACT_TO_EMAIL (optional).

const DEFAULT_TO = "espanola@nexeailkii.resend.app";

function clean(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body, status) {
  return Response.json(body, { status });
}

export async function onRequestPost({ request, env }) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 64 * 1024) {
    return json({ error: "Message too large." }, 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const name = clean(body?.name, 200);
  const email = clean(body?.email, 320);
  const subject = clean(body?.subject, 200);
  const message = clean(body?.message, 10000);
  const company = clean(body?.company, 200);

  if (company) {
    return json({ ok: true }, 202);
  }

  if (!name || !email || !subject || !message) {
    return json({ error: "All required fields must be completed." }, 400);
  }

  if (!isValidEmail(email)) {
    return json({ error: "A valid email address is required." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    return json({ error: "Email delivery is not configured yet." }, 503);
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL || DEFAULT_TO],
        subject: `[Contact] ${subject}`,
        reply_to: email,
        text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
        html: [
          "<h1>New contact form submission</h1>",
          `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
          `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
          `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
          "<p><strong>Message:</strong></p>",
          `<p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`,
        ].join(""),
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the message", response.status, await response.text());
      return json({ error: "Resend rejected the message." }, 502);
    }

    return json({ ok: true }, 200);
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return json({ error: "Unable to send the message right now." }, 500);
  }
}

export function onRequest() {
  return json({ error: "Method not allowed." }, 405);
}
