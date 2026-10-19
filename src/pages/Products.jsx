
import { useEffect, useState } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { getProducts } from '../services/products.service';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <main><p>Cargando productos...</p></main>;
  }

  if (error) {
    return (
      <main>
        <h2>No se pudieron cargar los productos</h2>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <section className="product-section">
        <h2 className="section-title">Nuestros productos</h2>

        {products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className="product-container">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
