import { Link } from "react-router-dom";
export function ContactPage() {
  const channels = [
    {
      n: "01",
      label: "General inquiries",
      value: "desk@espanola-investigation.com",
      note: "Editorial questions, corrections, permissions",
      href: "mailto:desk@espanola-investigation.com",
      tag: "Email",
    },
    {
      n: "02",
      label: "Tips & sources",
      value: "tips@espanola-investigation.com",
      note: "For source material, documents, or leads. Use encrypted mail or Signal for sensitive material.",
      href: "mailto:tips@espanola-investigation.com",
      tag: "Tip line",
    },
    {
      n: "03",
      label: "Signal (secure)",
      value: "+XX XXX XXX XXXX",
      note: "Preferred channel for sensitive communications. Disappearing messages enabled by default.",
      href: "#",
      tag: "Signal",
    },
    {
      n: "04",
      label: "Press & licensing",
      value: "press@espanola-investigation.com",
      note: "Syndication, republication, and press inquiries",
      href: "mailto:press@espanola-investigation.com",
      tag: "Press",
    },
  ];

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div style={{ borderBottom: "1px solid var(--paper-edge)", padding: "12px 32px", background: "var(--paper-0)" }}>
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
            <div className="eyebrow">The Investigations Desk</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>Open channel</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end" }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28, whiteSpace: "nowrap" }}>
                CONTACT.
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0 }}>
                For editorial questions, source material, or corrections. For sensitive communications, use Signal or encrypted email.
              </h2>
            </div>
            {/* source protection notice */}
            <div style={{ paddingBottom: 8 }}>
              <div style={{ background: "var(--paper-1)", border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", padding: "28px 28px 28px 24px" }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Source protection policy</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 16px" }}>
                  The desk does not disclose sources, retain identifying metadata beyond operational necessity, or cooperate with requests to identify confidential sources.
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", margin: 0 }}>
                  For maximum operational security, use Signal with disappearing messages enabled, or PGP-encrypted email. Do not send sensitive material over unencrypted channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* channels table + form */}
      <section style={{ padding: "56px 32px 88px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

          {/* left: channel ledger */}
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
                <a key={ch.n} href={ch.href} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", padding: "20px 20px", borderBottom: i === channels.length - 1 ? "none" : "1px solid var(--paper-edge)", background: i % 2 === 0 ? "var(--paper-0)" : "var(--paper-1)", textDecoration: "none", color: "inherit", alignItems: "start", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--classified)", paddingTop: 2 }}>{ch.n}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 5 }}>{ch.label}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 15, color: "var(--ink-0)", marginBottom: 6 }}>{ch.value}</div>
                    <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: "var(--ink-3)" }}>{ch.note}</div>
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-1)", border: "1px solid var(--paper-edge)", padding: "3px 7px 2px", whiteSpace: "nowrap" }}>{ch.tag}</span>
                </a>
              ))}
            </div>
          </div>

          {/* right: intake form */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ Send a Message ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              style={{ border: "1px solid var(--ink-1)", background: "var(--paper-0)" }}
            >
              <div style={{ padding: "24px 28px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
                Intake Form · Investigations Desk
              </div>
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
                  rows={6}
                  placeholder="Your message…"
                  required
                  style={{ display: "block", width: "100%", border: "none", background: "transparent", outline: "none", resize: "vertical", fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-0)", paddingBottom: 16, lineHeight: 1.6 }}
                />
              </div>
              <div style={{ padding: "20px 28px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  * Required · Do not send sensitive material via this form
                </span>
                <button
                  type="submit"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", border: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  ▸ Send
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
