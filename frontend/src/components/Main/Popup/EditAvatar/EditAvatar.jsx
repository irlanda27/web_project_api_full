import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

const EditAvatar = () => {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const avatarUrl = avatarRef.current.value;
    handleUpdateAvatar({ avatar: avatarUrl });
  };

  return (
    <form
      className="popup__form"
      onSubmit={handleSubmit}
      id="form-profile-avatar"
    >
      <input
        ref={avatarRef}
        className="popup__input"
        name="avatar"
        type="url"
        placeholder="URL de la imagen"
        id="input-url"
        required
      />
      <span id="input-url-error" className="input__message-error"></span>
      <button className="popup__button" id="button-save-avatar">
        {" "}
        Guardar{" "}
      </button>
    </form>
  );
};

export default EditAvatar;
