import { useState } from "react";
import { useSite } from "../lib/siteContext";
import { LocalizedLink } from "../components/layout/LocalizedLink";

const contactEmail = "espanola (dot) stegosaur692 (at) passmail (dot) com";
const CONTACT_COPY = {
  en: {
    overview: "Overview", openChannel: "Open channel", title: "CONTACT.", intro: "For any contact purpose, use the email address below.",
    channels: "Contact Channels", message: "Send a Message", support: "Support the work", coffee: "Buy me a coffee",
    contactEmail: "Contact email", contactEmailText: "Editorial questions, source material, corrections, permissions, press, licensing, and other inquiries should all be sent to the same address.",
    channel: "Channel", type: "Type", contact: "Contact", email: "Email",
    channelNote: "For editorial questions, source material, corrections, permissions, press, licensing, or any other contact purpose.",
    intakeForm: "Intake Form", fullName: "Full name", yourName: "Your name", emailAddress: "Email address", subject: "Subject",
    subjectPlaceholder: "Editorial question, tip, correction…", messageLabel: "Message", yourMessage: "Your message…",
    sending: "Sending...", unable: "Unable to send the message.", sent: "Message sent.", unreachable: "Contact service is not reachable locally.",
    requiredReply: "* Required · Replies go to your email address", send: "Send",
    supportBody: "This investigation is free and independent. No institutional backing, no advertising. If the work is useful, accurate, or simply worth your time, a contribution keeps the desk running and the next investigation open.",
  },
  es: {
    overview: "Inicio", openChannel: "Canal abierto", title: "CONTACTO.", intro: "Para cualquier motivo de contacto, utiliza la dirección de correo que figura abajo.",
    channels: "Canales de contacto", message: "Enviar un mensaje", support: "Apoya el trabajo", coffee: "Invítame a un café",
    contactEmail: "Correo de contacto", contactEmailText: "Las preguntas editoriales, materiales de fuente, correcciones, permisos, prensa, licencias y otras consultas deben enviarse a la misma dirección.",
    channel: "Canal", type: "Tipo", contact: "Contacto", email: "Correo",
    channelNote: "Para preguntas editoriales, material de fuentes, correcciones, permisos, prensa, licencias o cualquier otro motivo de contacto.",
    intakeForm: "Formulario", fullName: "Nombre completo", yourName: "Tu nombre", emailAddress: "Correo electrónico", subject: "Asunto",
    subjectPlaceholder: "Pregunta editorial, pista, corrección…", messageLabel: "Mensaje", yourMessage: "Tu mensaje…",
    sending: "Enviando...", unable: "No se pudo enviar el mensaje.", sent: "Mensaje enviado.", unreachable: "El servicio de contacto no es accesible localmente.",
    requiredReply: "* Obligatorio · Las respuestas se enviarán a tu correo", send: "Enviar",
    supportBody: "Esta investigación es libre e independiente. Sin respaldo institucional ni publicidad. Si el trabajo te resulta útil, riguroso o simplemente valioso, una contribución mantiene abierta la mesa de trabajo y la próxima investigación.",
  },
  fr: {
    overview: "Accueil", openChannel: "Canal ouvert", title: "CONTACT.", intro: "Pour toute prise de contact, utilisez l'adresse e-mail ci-dessous.",
    channels: "Canaux de contact", message: "Envoyer un message", support: "Soutenir le travail", coffee: "M'offrir un café",
    contactEmail: "E-mail de contact", contactEmailText: "Les questions éditoriales, les sources, les corrections, les autorisations, la presse, les licences et les autres demandes doivent toutes être envoyées à la même adresse.",
    channel: "Canal", type: "Type", contact: "Contact", email: "E-mail",
    channelNote: "Pour les questions éditoriales, les sources, les corrections, les autorisations, la presse, les licences ou toute autre prise de contact.",
    intakeForm: "Formulaire", fullName: "Nom complet", yourName: "Votre nom", emailAddress: "Adresse e-mail", subject: "Objet",
    subjectPlaceholder: "Question éditoriale, piste, correction…", messageLabel: "Message", yourMessage: "Votre message…",
    sending: "Envoi...", unable: "Impossible d'envoyer le message.", sent: "Message envoyé.", unreachable: "Le service de contact n'est pas accessible localement.",
    requiredReply: "* Obligatoire · Les réponses seront envoyées à votre adresse e-mail", send: "Envoyer",
    supportBody: "Cette enquête est libre et indépendante. Aucun soutien institutionnel, aucune publicité. Si ce travail vous est utile, rigoureux ou simplement digne d'intérêt, une contribution permet de maintenir le bureau ouvert et la prochaine enquête en chantier.",
  },
  ru: {
    overview: "Главная", openChannel: "Открытый канал", title: "КОНТАКТ.", intro: "По любому вопросу пишите на адрес ниже.",
    channels: "Каналы связи", message: "Отправить сообщение", support: "Поддержать работу", coffee: "Угостите кофе",
    contactEmail: "E-mail для связи", contactEmailText: "Редакционные вопросы, исходные материалы, исправления, разрешения, пресса, лицензирование и прочие обращения — на тот же адрес.",
    channel: "Канал", type: "Тип", contact: "Контакт", email: "E-mail",
    channelNote: "Для редакционных вопросов, исходных материалов, исправлений, разрешений, прессы, лицензирования и любых иных целей.",
    intakeForm: "Форма", fullName: "Полное имя", yourName: "Ваше имя", emailAddress: "E-mail", subject: "Тема",
    subjectPlaceholder: "Редакционный вопрос, наводка, поправка…", messageLabel: "Сообщение", yourMessage: "Ваше сообщение…",
    sending: "Отправка...", unable: "Не удалось отправить сообщение.", sent: "Сообщение отправлено.", unreachable: "Сервис контактов недоступен локально.",
    requiredReply: "* Обязательно · Ответ придёт на ваш e-mail", send: "Отправить",
    supportBody: "Это расследование — свободное и независимое. Без институциональной поддержки и рекламы. Если работа полезна, точна или просто стоит вашего времени — вклад поддерживает стол открытым, а следующее расследование — в работе.",
  },
};

export function ContactPage() {
  const { locale } = useSite();
  const copy = CONTACT_COPY[locale];
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });
  const channels = [
    {
      n: "01",
      label: copy.contact,
      value: contactEmail,
      note: copy.channelNote,
      tag: copy.email,
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setSubmitState({ status: "submitting", message: copy.sending });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || copy.unable);
      }

      form.reset();
      setSubmitState({ status: "success", message: copy.sent });
    } catch (error) {
      const isNetworkError = error instanceof TypeError;
      setSubmitState({
        status: "error",
        message: isNetworkError
          ? copy.unreachable
          : error instanceof Error
            ? error.message
            : copy.unable,
      });
    }
  }

  return (
    <main id="main-content">
      {/* breadcrumb */}
      <div className="page-crumb" style={{ paddingTop: 12, paddingBottom: 12, background: "var(--paper-0)" }}>
        <div className="page-crumb__inner">
          <LocalizedLink to="/" style={{ color: "inherit", textDecoration: "none" }}>{copy.overview}</LocalizedLink>
          <span>›</span>
          <span style={{ color: "var(--ink-0)" }}>{copy.title}</span>
        </div>
      </div>

      {/* hero */}
      <section className="page-section" style={{ position: "relative", paddingTop: 72, paddingBottom: 56, borderBottom: "1px solid var(--paper-edge)" }}>
        <span className="tick" style={{ top: 18, left: 18 }} aria-hidden="true" />
        <span className="tick" style={{ top: 18, right: 18 }} aria-hidden="true" />
        <div className="page-section__inner">
          <div className="page-eyebrow-row">
            <div className="eyebrow">Angel Ortiz</div>
            <div style={{ height: 1, background: "var(--ink-1)" }} />
            <div className="mono" style={{ color: "var(--ink-3)" }}>{copy.openChannel}</div>
          </div>
          <div className="page-intro__grid page-intro__grid--equal">
            <div>
              <div className="page-intro__title" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(48px, 8vw, 180px)", lineHeight: 0.85, color: "var(--ink-0)", letterSpacing: "-0.02em", marginBottom: 28 }}>
                {copy.title}
              </div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400, fontSize: 22, lineHeight: 1.4, color: "var(--ink-2)", margin: 0 }}>
                {copy.intro}
              </h2>
            </div>
            <div style={{ paddingBottom: 8 }}>
              <div style={{ background: "var(--paper-1)", border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", padding: "28px 28px 28px 24px" }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>{copy.contactEmail}</div>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.7, color: "var(--ink-1)", margin: "0 0 16px" }}>
                  {copy.contactEmailText}
                </p>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--ink-0)", overflowWrap: "anywhere" }}>{contactEmail}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* channels table + form */}
      <section className="page-section" style={{ paddingTop: 56, paddingBottom: 48 }}>
        <div className="page-section__inner page-contact__grid">

          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 24 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ {copy.channels} ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <div style={{ border: "1px solid var(--ink-1)" }}>
              {/* table header */}
              <div style={{ display: "grid", gridTemplateColumns: "40px 1fr auto", padding: "11px 20px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
                <span>№</span>
                <span>{copy.channel}</span>
                <span>{copy.type}</span>
              </div>
              {channels.map((ch, i) => (
                <div key={ch.n} className="contact-channel-row" style={{ padding: "20px 20px", borderBottom: i === channels.length - 1 ? "none" : "1px solid var(--paper-edge)", background: i % 2 === 0 ? "var(--paper-0)" : "var(--paper-1)", color: "inherit" }}>
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
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--classified)", fontWeight: 700 }}>✦ {copy.message} ✦</span>
              <span style={{ height: 1, background: "var(--ink-1)", flex: 1 }} />
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ border: "1px solid var(--ink-1)", background: "var(--paper-0)", display: "grid", gridTemplateRows: "auto auto auto auto auto auto" }}
            >
              <div style={{ padding: "11px 20px", background: "var(--ink-0)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--paper-0)" }}>
                {copy.intakeForm} · Angel Ortiz
              </div>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
              {[
                { id: "name", label: copy.fullName, type: "text", placeholder: copy.yourName, required: true },
                { id: "email", label: copy.emailAddress, type: "email", placeholder: "your@email.com", required: true },
                { id: "subject", label: copy.subject, type: "text", placeholder: copy.subjectPlaceholder, required: true },
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
                  {copy.messageLabel} <span style={{ color: "var(--classified)" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={copy.yourMessage}
                  required
                  style={{ display: "block", width: "100%", height: 92, border: "none", background: "transparent", outline: "none", resize: "none", fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink-0)", paddingBottom: 16, lineHeight: 1.6 }}
                />
              </div>
              <div className="contact-form__footer" style={{ padding: "20px 28px 24px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: submitState.status === "error" ? "var(--classified)" : "var(--ink-4)" }}>
                  {submitState.message || copy.requiredReply}
                </span>
                <button
                  type="submit"
                  disabled={submitState.status === "submitting"}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 44, padding: "0 20px", border: "1px solid var(--ink-1)", background: "var(--ink-0)", color: "var(--paper-0)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  {submitState.status === "submitting" ? copy.sending.replace("...", "") : `▸ ${copy.send}`}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* support strip */}
      <section className="page-section" style={{ paddingTop: 0, paddingBottom: 88 }}>
        <div className="page-section__inner">
          <div className="page-support__grid responsive-panel--support" style={{ border: "1px solid var(--ink-1)", borderLeft: "4px solid var(--classified)", background: "var(--paper-1)", position: "relative" }}>
            <span className="tick" style={{ bottom: 14, left: 14 }} aria-hidden="true" />
            <span className="tick" style={{ bottom: 14, right: 14 }} aria-hidden="true" />
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>{copy.support}</div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "clamp(22px,2.5vw,32px)", lineHeight: 1.1, letterSpacing: "-0.01em", color: "var(--ink-0)", margin: "0 0 14px" }}>
                {copy.coffee}
              </h2>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0, maxWidth: 640 }}>
                {copy.supportBody}
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
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}>{copy.coffee}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
