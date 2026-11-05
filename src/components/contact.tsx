import { type Locale } from "@/content/site";

export function Contact({ locale }: { locale: Locale }) {
  const es = locale === "es";
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-intro">
        <p className="eyebrow">
          {es ? "HABLEMOS DE SU ESTADÍA" : "LET’S PLAN YOUR STAY"}
        </p>
        <h2 id="contact-title">
          {es
            ? "Su escapada empieza\ncon una conversación."
            : "Your island stay starts\nwith a conversation."}
        </h2>
        <p>
          {es
            ? "¿Tiene alguna pregunta sobre la villa? Cuéntenos qué tiene en mente y le responderemos por correo."
            : "Have a question about the villa? Tell us what you have in mind and we’ll reply by email."}
        </p>
        <a className="contact-email" href="mailto:villatortugapr@gmail.com">
          villatortugapr@gmail.com ↗
        </a>
        <p className="contact-note">
          {es
            ? "Para consultar tarifas, disponibilidad y confirmar una reserva, visite nuestro anuncio en Airbnb."
            : "For rates, availability and confirmed bookings, visit our Airbnb listing."}
        </p>
      </div>
      <form
        className="contact-form"
        action="https://formsubmit.co/villatortugapr@gmail.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="Villa Tortuga — Website inquiry"
        />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="language" value={locale} />
        <div className="contact-trap" aria-hidden="true">
          <label>
            Leave empty
            <input name="_honey" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="contact-fields">
          <label>
            {es ? "Nombre" : "Name"}
            <input name="name" autoComplete="name" required maxLength={120} />
          </label>
          <label>
            {es ? "Correo electrónico" : "Email address"}
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          {es ? "Su mensaje" : "Your message"}
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            placeholder={
              es
                ? "¿Cómo podemos ayudarle a planificar su visita?"
                : "How can we help you plan your visit?"
            }
          />
        </label>
        <p className="contact-note">
          {es
            ? "Todos los campos son obligatorios. Usaremos sus datos para responder a su consulta. FormSubmit procesa el envío y le llevará a una página de verificación y confirmación."
            : "All fields are required. We’ll use your details to respond to your inquiry. FormSubmit processes your message and takes you to a verification and confirmation page."}
        </p>
        <button className="button" type="submit">
          {es ? "Enviar consulta" : "Send inquiry"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  );
}
