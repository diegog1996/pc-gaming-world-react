
import { useState } from "react";
import "../styles/styles.css";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.target.reset();
  }

  return (
    <main className="info-page">
      <section className="info-page__hero">
        <p className="info-page__eyebrow">ESTAMOS PARA AYUDARTE</p>
        <h1>Contacto</h1>
        <p>
          ¿Tenés alguna consulta sobre nuestros productos?
          Completá el formulario y contanos en qué podemos ayudarte.
        </p>
      </section>

      <section className="contact-layout">
        <div className="info-page__content">
          <h2>Hablemos de gaming</h2>
          <p>
            Podés escribirnos por consultas sobre componentes,
            periféricos y productos para tu setup gamer.
          </p>

          <h3>PC Gaming World</h3>
          <p>Tu próximo setup empieza acá.</p>
          <p>
            Explorá nuestro catálogo para conocer los productos disponibles.
          </p>
        </div>

        <div className="contact-form-card">
          <h2>Enviá tu consulta</h2>

          {sent && (
            <p className="contact-success" role="status">
              ¡Gracias por tu consulta! El formulario fue validado,
              pero el envío real todavía no está conectado.
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="contact-name">Nombre</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength="2"
              placeholder="Tu nombre"
            />

            <label htmlFor="contact-email">Correo electrónico</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              placeholder="tu@email.com"
            />

            <label htmlFor="contact-subject">Asunto</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              placeholder="¿Sobre qué querés consultar?"
            />

            <label htmlFor="contact-message">Mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              rows="5"
              required
              minLength="10"
              placeholder="Escribí tu consulta..."
            />

            <button type="submit">Enviar consulta</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;
