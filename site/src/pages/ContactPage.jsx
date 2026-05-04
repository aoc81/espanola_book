import { useState } from "react";
import { Link } from "react-router-dom";

const contactEmail = "espanola (dot) stegosaur692 (at) passmail (dot) com";

export function ContactPage() {
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const channels = [
    {
      n: "01",
      label: "Contact",
      value: contactEmail,
      note: "For editorial questions, source material, corrections, permissions, press, licensing, or any other contact purpose.",
      tag: "Email",
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitState({ status: "submitting", message: "Sending..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || "Unable to send the message.");
      }

      form.reset();
      setSubmitState({ status: "success", message: "Message sent." });
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      setSubmitState({
        status: "error",
        message: isNetworkError
          ? "Contact service is not reachable locally."
          : error instanceof Error
            ? error.message
            : "Unable to send the message.",
      });
    }
  }

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div style={{ padding: "12px 32px", background: "var(--paper-0)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Overview</Link>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>Contact</span>
        </div>
      </div>

      {/* hero */}
      <section style={{ position: "relative", padding: "72px 32px 56px", borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", marginBottom: 36, gap: 24 }}>
            <div className="eyebrow">Angel Ortiz</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>Open channel</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28, whiteSpace: "nowrap" }}>
                CONTACT.
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0 }}>
                For any contact purpose, use the email address below.
              </h2>
            </div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ background: "var(--paper-1)", border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", padding: "28px 28px 28px 24px" }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Contact email</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 16px" }}>
                  Editorial questions, source material, corrections, permissions, press, licensing, and other inquiries should all be sent to the same address.
                </p>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-0)", overflowWrap: "anywhere" }}>{contactEmail}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* channels table + form */}
      <section style={{ padding: "56px 32px 48px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Contact Channels ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <div style={{ border: "1px solid var(--ink-1)" }}>
              {/* table header */}
              <div style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", padding: "11px 20px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
                <span>№</span>
                <span>Channel</span>
                <span>Type</span>
              </div>
              {channels.map((ch, i) => (
                <div key={ch.n} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", padding: "20px 20px", borderBottom: i === channels.length - 1 ? "none" : "1px solid var(--paper-edge)", background: i % 2 === 0 ? "var(--paper-0)" : "var(--paper-1)", color: "inherit", alignItems: "start", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--classified)", paddingTop: 2 }}>{ch.n}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 5 }}>{ch.label}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15, color: "var(--ink-0)", marginBottom: 6 }}>{ch.value}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: "var(--ink-3)" }}>{ch.note}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-1)", border: "1px solid var(--paper-edge)", padding: "3px 7px 2px", whiteSpace: "nowrap" }}>{ch.tag}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Send a Message ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ border: "1px solid var(--ink-1)", background: "var(--paper-0)", display: "grid", gridTemplateRows: "auto auto auto auto auto auto" }}
            >
              <div style={{ padding: "11px 20px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
                Intake Form · Angel Ortiz
              </div>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
              {[
                { id: "name", label: "Full name", type: "text", placeholder: "Your name", required: true },
                { id: "email", label: "Email address", type: "email", placeholder: "your@email.com", required: true },
                { id: "subject", label: "Subject", type: "text", placeholder: "Editorial question, tip, correction…", required: true },
              ].map((field) => (
                <div key={field.id} style={{ padding: "20px 28px 0", borderBottom: "1px solid var(--paper-edge)" }}>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }} htmlFor={field.id}>
                    {field.label}{field.required && <span style={{ color: "var(--classified)", marginLeft: 4 }}>*</span>}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    required={field.required}
                    style={{ display: "block", width: "100%", border: "none", background: "transparent", outline: "none", fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-0)", paddingBottom: 16 }}
                  />
                </div>
              ))}
              <div style={{ padding: "20px 28px 0", borderBottom: "1px solid var(--paper-edge)" }}>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 8 }} htmlFor="message">
                  Message <span style={{ color: "var(--classified)" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Your message…"
                  required
                  style={{ display: "block", width: "100%", height: 92, border: "none", background: "transparent", outline: "none", resize: "none", fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-0)", paddingBottom: 16, lineHeight: 1.6 }}
                />
              </div>
              <div style={{ padding: "20px 28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: submitState.status === "error" ? "var(--classified)" : "var(--ink-4)" }}>
                  {submitState.message || "* Required · Replies go to your email address"}
                </span>
                <button
                  type="submit"
                  disabled={submitState.status === "submitting"}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", border: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  {submitState.status === "submitting" ? "Sending" : "▸ Send"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* support strip */}
      <section style={{ padding: "0 32px 88px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center", padding: "40px 48px", border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", background: "var(--paper-1)", position: "relative" }}>
            <span className="tick" style={{ bottom: 14, left: 14 }} aria-hidden="true" />
            <span className="tick" style={{ bottom: 14, right: 14 }} aria-hidden="true" />
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Support the work</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(22px,2.5vw,32px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 14px" }}>
                Buy me a coffee
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: 640 }}>
                This investigation is free and independent. No institutional backing, no advertising. If the work is useful, accurate, or simply worth your time, a contribution keeps the desk running and the next investigation open.
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <a
                href="https://buymeacoffee.com/angelortiz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 36px", background: "var(--classified)", color: "var(--paper-0)", textDecoration: "none" }}
              >
                <span style={{ fontSize: 28 }}>☕</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>Buy me a coffee</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
