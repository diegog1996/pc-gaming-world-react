
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/products.service';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError('');
      setProduct(null);

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return <main><p>Cargando producto...</p></main>;
  }

  if (error) {
    return (
      <main>
        <h2>No se pudo mostrar el producto</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="product-detail-section">
        <div className="product-detail-container">
          <article className="product-card-detail">
            <h2 className="product-name">{product.name}</h2>

            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />

            <p>Categoría: {product.category}</p>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>

            <button className="buy-button" type="button">
              Agregar al carrito
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
          </article>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
