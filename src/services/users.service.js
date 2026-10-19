
const BASE_URL = import.meta.env.VITE_API_URL;

export async function createUser(userData) {
  if (!BASE_URL) {
    throw new Error('Falta configurar VITE_API_URL en el archivo .env');
  }

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`Error al registrar el usuario: ${response.status}`);
  }

  return await response.json();
}

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('No se pudieron cargar los usuarios.');
  }

  return response.json();
}

export async function updateUser(id, userData) {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo actualizar el usuario.');
  }

  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('No se pudo eliminar el usuario.');
  }
}