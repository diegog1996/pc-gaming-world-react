
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h3 className="product-name">{product.name}</h3>

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <p>Categoria: {product.category}</p>

      <div>Precio: ${product.price}</div>

      <button className="buy-button" type="button">
        Comprar
      </button>

      <Link
        to={`/products/${product.id}`}
        className="details"
      >
        Ver más
      </Link>
    </article>
  );
}

export default ProductCard;
