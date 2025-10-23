import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ email, password });
  }

  return (
  <div className="auth">
    <h2 className="auth__title">Iniciar sesión</h2>
    <form className="auth__form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="auth__input"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="auth__input"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="auth__submit" type="submit">
        Iniciar sesión
      </button>
    </form>
    <p className="auth__signin">
      ¿No tienes cuenta?
      <Link className="auth__signin-link" to="/signup">
        Regístrate
      </Link>
    </p>
  </div>
  );
}

export default Login;