
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="header">
      <Link to="/" aria-label="Ir al inicio">
        <img
          src="/assets/images/logo.png"
          alt="PC Gaming World Logo"
          className="logo"
        />
      </Link>

      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/">Inicio</Link></li>
          <li className="nav-item"><Link to="/products">Productos</Link></li>
          <li className="nav-item"><Link to="/register">Registro</Link></li>
          <li className="nav-item"><Link to="/contact">Contacto</Link></li>
          <li className="nav-item"><Link to="/about">Sobre nosotros</Link></li>
          <li className="nav-item"><Link to="/admin">Admin</Link></li>
        </ul>
      </nav>

      <div className="user-utilities">
        <Link to="/login" aria-label="Iniciar sesión">
          <i className="fa-solid fa-user"></i>
        </Link>
        <i className="fa-solid fa-cart-shopping"></i>
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>

      <i className="fa-solid fa-bars hamburger-icon"></i>
    </header>
  );
}

export default Navbar;
