import dotenv from "dotenv";
import express from "express";
import { Resend } from "resend";

dotenv.config({ path: new URL("./.env.local", import.meta.url) });

const app = express();

const port = Number(process.env.PORT || 4000);
const resendApiKey = process.env.RESEND_API_KEY || "";
const resendFromEmail = process.env.RESEND_FROM_EMAIL || "";
const contactToEmail = process.env.CONTACT_TO_EMAIL || "espanola@nexeailkii.resend.app";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

app.use(express.json({ limit: "64kb" }));

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

app.get("/healthz", (_req, res) => {
  res.json({
    ok: true,
    resendConfigured: Boolean(resendApiKey && resendFromEmail),
  });
});

app.post("/api/contact", async (req, res) => {
  const name = clean(req.body?.name, 200);
  const email = clean(req.body?.email, 320);
  const subject = clean(req.body?.subject, 200);
  const message = clean(req.body?.message, 10000);
  const company = clean(req.body?.company, 200);

  if (company) {
    return res.status(202).json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All required fields must be completed." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (!resend) {
    return res.status(503).json({ error: "Email delivery is not configured yet." });
  }

  try {
    const { error } = await resend.emails.send({
      from: resendFromEmail,
      to: [contactToEmail],
      subject: `[Contact] ${subject}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
      html: [
        "<h1>New contact form submission</h1>",
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        `<p><strong>Message:</strong></p>`,
        `<p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>`,
      ].join(""),
    });

    if (error) {
      return res.status(502).json({ error: "Resend rejected the message." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return res.status(500).json({ error: "Unable to send the message right now." });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on ${port}`);
});
