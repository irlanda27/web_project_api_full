import { useState } from "react";
import {register} from "../../utils/auth.js";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password );
  }

  return (
    <div className="auth">
  <h2 className="auth__title">Registrarse</h2>
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
      Registrarse
    </button>
  </form>
</div>
  );
}

export default Register;