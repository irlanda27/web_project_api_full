import CloseIcon from "../../../images/close_icon.png";

export default function Popup(props) {
  const { title, children, onClose, isOpen } = props;
console.log(props);
  // 1) No renderizar si está cerrado
  /*if (!isOpen) return null;*/

  // 2) Cerrar si se hace clic en el overlay
  function handleOverlayClick(e) {
    if (e.target.classList.contains("popup")) onClose();
  }

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div className="popup__container">
        {title && <h3 className="popup__title">{title}</h3>}

        {children}

        <button className="popup__close" onClick={onClose} id="close-icon">
          <img className="popup__close-icon" src={CloseIcon} alt="Cerrar" />
        </button>
      </div>
    </div>
  );
}
