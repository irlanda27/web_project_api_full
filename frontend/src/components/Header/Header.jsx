import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";  

function Header({ email, onSignOut, loggedIn }) {
  return (
    <header className="header">
      <img className="header__vector" src={logo} alt="logo de Triple Ten" />

      {loggedIn ? (
        <div className="header__user-info">
          <p className="header__email">{email}</p>
          <button className="header__logout-button" onClick={onSignOut}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <nav className="header__auth-links">
          {/* Figma pide “Iniciar sesión” arriba a la derecha */}
          <Link className="header__link" to="/signin">
            Iniciar sesión
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
