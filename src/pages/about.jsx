
import "../styles/styles.css";

function About() {
  return (
    <main className="info-page">
      <section className="info-page__hero">
        <p className="info-page__eyebrow">PC GAMING WORLD</p>
        <h1>Acerca de nosotros</h1>
        <p>
          Somos una tienda dedicada al mundo del gaming y la tecnología,
          con productos pensados para quienes buscan mejorar su experiencia
          de juego.
        </p>
      </section>

      <section className="info-page__content">
        <h2>Nuestra misión</h2>
        <p>
          Queremos acercarte componentes, periféricos y accesorios para que
          puedas armar, actualizar y disfrutar tu espacio gamer.
        </p>

        <h2>¿Qué nos inspira?</h2>
        <p>
          La pasión por los videojuegos, la innovación tecnológica y el deseo
          de que cada jugador encuentre el equipo que necesita.
        </p>

        <h2>Nuestro compromiso</h2>
        <p>
          Buscamos ofrecer una experiencia de compra clara, una buena
          presentación de nuestros productos y una navegación sencilla.
        </p>
      </section>
    </main>
  );
}

export default About;
