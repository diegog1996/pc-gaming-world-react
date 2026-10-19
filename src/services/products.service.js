
const BASE_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
  if (!BASE_URL) {
    throw new Error(
      'Falta configurar VITE_API_URL en el archivo .env'
    );
  }

  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(
      `Error al cargar productos: ${response.status}`
    );
  }

  return await response.json();
}


export async function getProductById(id) {
  if (!BASE_URL) {
    throw new Error('Falta configurar VITE_API_URL en el archivo .env');
  }

  const response = await fetch(
    `${BASE_URL}/products/${encodeURIComponent(id)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No se encontró el producto solicitado.');
    }

    throw new Error(`Error al cargar el producto: ${response.status}`);
  }

  return await response.json();
}

export async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...productData,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('No se pudo crear el producto.');
  }

  return response.json();
}

export async function updateProduct(id, productData) {
  const response = await fetch(
    `${BASE_URL}/products/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo actualizar el producto.');
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(
    `${BASE_URL}/products/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo eliminar el producto.');
  }
}