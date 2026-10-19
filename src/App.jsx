
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import './styles/styles.css';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';

function Home() {
  return (
    <>
      <section className="banner">
        <img
          src="/assets/images/banner.jpg"
          alt="PC, componentes y periféricos"
          className="banner-image"
        />

        <div className="banner-content">
          <h2>Lo último en tecnología para PC</h2>
          <p>
            Descubrí las últimas novedades del mundo del PC
            y los mejores componentes para gaming.
          </p>
        </div>
      </section>

      <section className="hero-section">
        <div className="hero-content-text">
          <h2>Bienvenidos a PC Gaming World</h2>
          <p>
            Somos tu tienda especializada en PC, periféricos
            y componentes de alta gama.
          </p>
        </div>

        <div className="hero-content-image">
          <img
            src="/assets/images/hero-image.jpg"
            alt="PC con componentes y periféricos"
          />
        </div>
      </section>
    </>
  );
}

function NotReady({ title }) {
  return (
    <main>
      <h1>{title}</h1>
      <p>Esta sección estará disponible en el siguiente paso.</p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
       <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route
          path="/contact"
          element={<NotReady title="Contacto" />}
        />
        <Route
          path="/about"
          element={<NotReady title="Sobre nosotros" />}
        />
        <Route path="/admin" element={<AdminProducts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
