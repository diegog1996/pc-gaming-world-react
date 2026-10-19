
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <a href="https://www.facebook.com/">
            <i className="fa-brands fa-square-facebook"></i>
            Facebook
          </a>

          <a href="https://www.instagram.com/">
            <i className="fa-brands fa-instagram"></i>
            Instagram
          </a>

          <a href="https://www.linkedin.com/">
            <i className="fa-brands fa-linkedin"></i>
            LinkedIn
          </a>
        </div>

        <div className="footer-column">
          <img
            src="/assets/images/logo.png"
            alt="PC Gaming World Logo"
            className="footer-logo"
          />
          <div className="nieto">
            <p>© 2026 PC Gaming World. Todos los derechos reservados.</p>
          </div>
        </div>

        <div className="footer-column">
          <p>Contacto:</p>
          <p>Email: contacto@PCGamingworld.com</p>
          <p>Teléfono: +1 234 567 890</p>
          <p>Dirección: 3 Roydon Pl, Nepean, Ontario, Canada</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
