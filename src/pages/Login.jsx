
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(data) {
    // Ejercicio académico: mostramos el correo,
    // pero evitamos imprimir la contraseña en la consola.
    console.log('Correo ingresado:', data.email);

    setMessage('Formulario validado correctamente.');
  }

  return (
    <main className="login-page">
      <section className="login-container">
        <h1>Iniciar sesión</h1>
        <p>Ingresa tus datos para continuar.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
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

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: 'La contraseña es obligatoria.',
            })}
          />

          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}

          <button type="submit" disabled={isSubmitting}>
            Iniciar sesión
          </button>

          {message && <p role="status">{message}</p>}
        </form>

        <p>
          ¿Todavía no tienes una cuenta?{' '}
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
