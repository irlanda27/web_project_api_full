import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function EditProfile({ handleUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, about } = currentUser;
  const [userName, setUserName] = useState(name);
  const [userAbout, setUserAbout] = useState(about);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      name: userName,
      about: userAbout,
    });
  };

  return (
    <form
      className="popup__form"
      id="form-profile"
      noValidate=""
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        type="text"
        placeholder="Nombre"
        name="name"
        id="input-name"
        minLength={2}
        maxLength={40}
        required=""
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <span id="input-name-error" className="input__message-error" />
      <input
        className="popup__input"
        type="text"
        placeholder="Acerca de mí"
        name="about"
        id="input-about-me"
        minLength={2}
        maxLength={200}
        required=""
        value={userAbout}
        onChange={(e) => setUserAbout(e.target.value)}
      />
      <span id="input-about-me-error" className="input__message-error" />
      <button className="popup__button" id="button-submitProfile">
        {" "}
        Guardar{" "}
      </button>
    </form>
  );
}
