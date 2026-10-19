import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.service';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
    },
  });

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function onSubmit(data) {
    try {
      setError('');
      setMessage('');

      const productData = {
        name: data.name.trim(),
        price: Number(data.price),
        description: data.description.trim(),
        image: data.image.trim(),
        category: data.category,
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct.id, productData);
        setMessage('Producto actualizado correctamente.');
      } else {
        await createProduct(productData);
        setMessage('Producto creado correctamente.');
      }

      reset({
        name: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });

      setSelectedProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.message || 'No se pudo guardar el producto.');
    }
  }

  function handleEdit(product) {
    setSelectedProduct(product);
    setMessage('');
    setError('');

    reset({
      name: product.name ?? '',
      price: product.price ?? '',
      description: product.description ?? '',
      image: product.image ?? '',
      category: product.category ?? '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setSelectedProduct(null);
    reset({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
    });
    setError('');
    setMessage('');
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar "${product.name}"?`
    );

    if (!confirmed) return;

    try {
      setError('');
      setMessage('');

      await deleteProduct(product.id);

      setProducts((currentProducts) =>
        currentProducts.filter((item) => item.id !== product.id)
      );

      if (selectedProduct?.id === product.id) {
        handleCancelEdit();
      }

      setMessage('Producto eliminado correctamente.');
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el producto.');
    }
  }

  return (
    <main className="admin-products-page">
      <div className="admin-products-container">
        <h1>Administración de productos</h1>

        <section className="admin-product-form-section">
          <h2>
            {selectedProduct ? 'Editar producto' : 'Agregar producto'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor="name">Nombre del producto</label>
            <input
              id="name"
              {...register('name', {
                required: 'El nombre es obligatorio.',
                minLength: {
                  value: 3,
                  message: 'Debe tener al menos 3 caracteres.',
                },
              })}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}

            <label htmlFor="price">Precio</label>
            <input
              id="price"
              type="number"
              step="0.01"
              min="0.01"
              {...register('price', {
                required: 'El precio es obligatorio.',
                valueAsNumber: true,
                min: {
                  value: 0.01,
                  message: 'El precio debe ser mayor que cero.',
                },
                validate: (value) =>
                  Number.isFinite(value) || 'Introduce un precio válido.',
              })}
            />
            {errors.price && (
              <p className="form-error">{errors.price.message}</p>
            )}

            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              {...register('category', {
                required: 'Selecciona una categoría.',
              })}
            >
              <option value="">Seleccionar categoría</option>
              <option value="Procesadores">Procesadores</option>
              <option value="Motherboard">Motherboard</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Tarjeta Grafica">Tarjeta gráfica</option>
              <option value="Almacenamiento">Almacenamiento</option>
              <option value="Memoria RAM">Memoria RAM</option>
            </select>
            {errors.category && (
              <p className="form-error">{errors.category.message}</p>
            )}

            <label htmlFor="image">URL de la imagen</label>
            <input
              id="image"
              type="text"
              placeholder="/assets/images/product-image-1.jpg"
              {...register('image', {
                required: 'La imagen es obligatoria.',
              })}
            />
            {errors.image && (
              <p className="form-error">{errors.image.message}</p>
            )}

            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              rows="4"
              {...register('description', {
                required: 'La descripción es obligatoria.',
                minLength: {
                  value: 10,
                  message: 'Escribe al menos 10 caracteres.',
                },
              })}
            />
            {errors.description && (
              <p className="form-error">{errors.description.message}</p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Guardando...'
                : selectedProduct
                  ? 'Guardar cambios'
                  : 'Agregar producto'}
            </button>

            {selectedProduct && (
              <button type="button" onClick={handleCancelEdit}>
                Cancelar edición
              </button>
            )}
          </form>

          {message && <p className="admin-success">{message}</p>}
          {error && <p className="form-error">{error}</p>}
        </section>

        <section className="admin-product-list-section">
          <h2>Productos existentes</h2>

          {loading ? (
            <p>Cargando productos...</p>
          ) : error && products.length === 0 ? (
            <p>No se pudo cargar la lista de productos.</p>
          ) : products.length === 0 ? (
            <p>Todavía no hay productos registrados.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>
                        {Number(product.price).toLocaleString('es-AR', {
                          style: 'currency',
                          currency: 'ARS',
                        })}
                      </td>
                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(product)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminProducts;