
import checkIcon from "../images/check.png";
/*import errorIcon from "../images/ex.png";*/

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup__container popup__container--tooltip">
        <button className="popup__close-window" onClick={onClose}>✖</button>

        <img
          src={isSuccess ? checkIcon : checkIcon}
          alt={isSuccess ? "Éxito" : "Error"}
          className="popup__icon"
        />

        <p className="popup__message">
          {isSuccess
            ? "¡Registro exitoso! Ahora puedes iniciar sesión."
            : "Uy, algo salió mal. Intenta de nuevo."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;