
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/users.service';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      birthDate: '',
      province: '',
      password: '',
    },
  });

  async function loadUsers() {
    try {
      setLoading(true);
      setError('');

      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function clearForm() {
    setSelectedUser(null);
    reset({
      name: '',
      email: '',
      birthDate: '',
      province: '',
      password: '',
    });
  }

  function handleEdit(user) {
    setSelectedUser(user);
    setError('');
    setMessage('');

    reset({
      name: user.name ?? '',
      email: user.email ?? '',
      birthDate: user.birthDate ?? '',
      province: user.province ?? '',
      password: '',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function onSubmit(data) {
    try {
      setError('');
      setMessage('');

      const userData = {
        name: data.name.trim(),
        email: data.email.trim(),
        birthDate: data.birthDate,
        province: data.province.trim(),
      };

      // En una edición no cambiamos la contraseña.
      // Solo la incluimos si el usuario escribió una nueva.
      if (data.password.trim()) {
        userData.password = data.password;
      }

      if (selectedUser) {
        await updateUser(selectedUser.id, userData);
        setMessage('Usuario actualizado correctamente.');
      } else {
        if (!data.password.trim()) {
          setError('La contraseña es obligatoria al crear un usuario.');
          return;
        }

        await createUser({
          ...userData,
          password: data.password,
        });

        setMessage('Usuario creado correctamente.');
      }

      clearForm();
      await loadUsers();
    } catch (err) {
      setError(err.message || 'No se pudo guardar el usuario.');
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar a ${user.name}?`
    );

    if (!confirmed) return;

    try {
      setError('');
      setMessage('');

      await deleteUser(user.id);

      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== user.id)
      );

      if (selectedUser?.id === user.id) {
        clearForm();
      }

      setMessage('Usuario eliminado correctamente.');
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el usuario.');
    }
  }

  return (
    <main className="admin-users-page">
      <div className="admin-users-container">
        <h1>Administración de usuarios</h1>

        <section className="admin-user-form-section">
          <h2>
            {selectedUser ? 'Editar usuario' : 'Crear usuario'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor="user-name">Nombre completo</label>
            <input
              id="user-name"
              {...register('name', {
                required: 'El nombre es obligatorio.',
                minLength: {
                  value: 3,
                  message: 'Escribe al menos 3 caracteres.',
                },
              })}
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}

            <label htmlFor="user-email">Correo electrónico</label>
            <input
              id="user-email"
              type="email"
              {...register('email', {
                required: 'El correo es obligatorio.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Introduce un correo válido.',
                },
              })}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}

            <label htmlFor="user-birthDate">Fecha de nacimiento</label>
            <input
              id="user-birthDate"
              type="date"
              {...register('birthDate', {
                required: 'La fecha de nacimiento es obligatoria.',
              })}
            />
            {errors.birthDate && (
              <p className="form-error">
                {errors.birthDate.message}
              </p>
            )}

            <label htmlFor="user-province">Provincia</label>
            <input
              id="user-province"
              {...register('province', {
                required: 'La provincia es obligatoria.',
              })}
            />
            {errors.province && (
              <p className="form-error">
                {errors.province.message}
              </p>
            )}

            <label htmlFor="user-password">
              {selectedUser
                ? 'Nueva contraseña (opcional)'
                : 'Contraseña'}
            </label>
            <input
              id="user-password"
              type="password"
              autoComplete="new-password"
              {...register('password', {
                required: selectedUser
                  ? false
                  : 'La contraseña es obligatoria.',
                minLength: {
                  value: 6,
                  message: 'Debe tener al menos 6 caracteres.',
                },
              })}
            />
            {errors.password && (
              <p className="form-error">
                {errors.password.message}
              </p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Guardando...'
                : selectedUser
                  ? 'Guardar cambios'
                  : 'Crear usuario'}
            </button>

            {selectedUser && (
              <button type="button" onClick={clearForm}>
                Cancelar edición
              </button>
            )}
          </form>

          {message && <p className="admin-success">{message}</p>}
          {error && <p className="form-error">{error}</p>}
        </section>

        <section className="admin-user-list-section">
          <h2>Usuarios registrados</h2>

          <button
            type="button"
            onClick={loadUsers}
            disabled={loading}
          >
            Actualizar lista
          </button>

          {loading ? (
            <p>Cargando usuarios...</p>
          ) : users.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Fecha de nacimiento</th>
                    <th>Provincia</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.birthDate}</td>
                      <td>{user.province}</td>
                      <td>
                        <div className="admin-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(user)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(user)}
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

export default AdminUsers;
