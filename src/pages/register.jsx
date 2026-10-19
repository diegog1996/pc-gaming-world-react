
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { createUser } from '../services/users.service';

function Register() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  async function onSubmit(data) {
    setMessage('');
    setError('');

    try {
      const { confirmPassword, ...userData } = data;

      await createUser(userData);

      setMessage('¡Registro completado correctamente!');
      reset();
    } catch (err) {
      setError(err.message || 'No se pudo completar el registro.');
    }
  }

  return (
    <main className="register-page">
      <section className="register-container">
        <h1>Crear una cuenta</h1>
        <p>Completa tus datos para registrarte en PC Gaming World.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'El nombre es obligatorio.',
            })}
          />
          {errors.name && <p className="form-error">{errors.name.message}</p>}

          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'El correo es obligatorio.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Introduce un correo válido.',
              },
            })}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}

          <label htmlFor="birthDate">Fecha de nacimiento</label>
          <input
            id="birthDate"
            type="date"
            {...register('birthDate', {
              required: 'La fecha de nacimiento es obligatoria.',
            })}
          />
          {errors.birthDate && (
            <p className="form-error">{errors.birthDate.message}</p>
          )}

          <label htmlFor="province">Provincia</label>
          <input
            id="province"
            type="text"
            {...register('province', {
              required: 'La provincia es obligatoria.',
            })}
          />
          {errors.province && (
            <p className="form-error">{errors.province.message}</p>
          )}

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register('password', {
              required: 'La contraseña es obligatoria.',
              minLength: {
                value: 6,
                message: 'Debe tener al menos 6 caracteres.',
              },
            })}
          />
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}

          <label htmlFor="confirmPassword">Repetir contraseña</label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Repite la contraseña.',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden.',
            })}
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrarme'}
          </button>

          {message && <p role="status">{message}</p>}
          {error && <p className="form-error" role="alert">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default Register;
