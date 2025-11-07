import { useState } from "react";
import api from "../../../../utils/api";

const NewCard = ({ onAddPlaceSubmit, onClosePopup }) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const [errors, setErrors] = useState({
    cardNameError: "",
    cardLinkError: "",
  });

  //*Funcion para el handle del formulario..............................................................................

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {
      cardNameError: "",
      cardLinkError: "",
    };

    if (cardName.trim().length < 2) {
      newErrors.cardNameError = "El título debe tener al menos 2 caracteres";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      api.addCard({ name: cardName, link: cardLink })
      .then((newCard) => {
      onAddPlaceSubmit(newCard);
      onClosePopup();
  })
.catch((err) => {
  console.error("Error al agregar la tarjeta:", err);
});
    }
  };


  return (
    <form className="popup__form" id="form-card" onSubmit={handleSubmit}>
      <input
        className="popup__input"
        name="name"
        type="text"
        placeholder="Titulo"
        id="input-title"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        minLength="2"
        maxLength="40"
        required
      />
      <span id="input-title-error" className="input__message-error">
        {errors.cardNameError}
      </span>

      <input
        className="popup__input"
        type="url"
        name="link"
        placeholder="Enlace a la imagen"
        id="input-image-url"
        value={cardLink}
        onChange={(e) => setCardLink(e.target.value)}
        required
      />
      <span id="input-image-url-error" className="input__message-error">
        {errors.cardLinkError}
      </span>

      <button className="popup__button" id="button-submitNewCard" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default NewCard;
