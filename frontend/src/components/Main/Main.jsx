import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState } from "react";
import lapiz from "../../images/lapicito.png";
import userImage from "../../images/image.jpg";
import editProfileButton from "../../images/edit_button.png";
import addButton from "../../images/addCard_button.svg";
import Popup from "./Popup/Popup";
import NewCard from "./Popup/NewCard/NewCard";
import EditProfile from "./Popup/EditProfile/EditProfile";
import EditAvatar from "./Popup/EditAvatar/EditAvatar";
import Card from "../Main/components/Card/Card.jsx";
import ImagePopup from "./Popup/ImagePopup/ImagePopup";

export default function Main({
  cards,
  onOpenPopup,
  onClosePopup,
  popup,
  onCardLike,
  onCardDelete,
  setPopup,
  onAddPlaceSubmit,
  handleUpdateUser,
  loggedIn,
  userEmail,
  onSignOut,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  console.log(currentUser, "currentUser en Main");
  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        onAddPlaceSubmit={onAddPlaceSubmit}
        onClosePopup={onClosePopup}
      />
    ),
  };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile handleUpdateUser={handleUpdateUser} />,
  };
  const EditAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };

  const handleOpenImagePopup = (name, link) => {
    setName(name);
    setLink(link);
    setPopup({ children: <ImagePopup name={name} link={link} /> });

    console.log(name, link);
  };
  console.log(name, link);
console.log(popup, "popup");

  return (
    <>
      <main>
        <div className="profile">
          <div className="profile__avatar">
            <div className="profile__overlay" />
            <img
              className="profile__pencil-avatar"
              src={lapiz}
              id="lapicito-editor"
              alt="icono de lapiz"
            />
            <img
              className="profile__image"
              src={currentUser?.avatar}
              alt="imagen del usuario"
              onClick={() => onOpenPopup(EditAvatarPopup)}
            />
          </div>
          <div>
            <div className="profile__info">
              <div className="profile__name">
                <div className="profile__edit">
                  <p id="profile-name">
                    {currentUser?.name}
                  </p>
                  <button className="profile__button" id="pencil-editor">
                    <img
                      src={editProfileButton}
                      alt="iconodelapiz>"
                      onClick={() => onOpenPopup(EditProfilePopup)}
                    />
                  </button>
                </div>
                <p className="profile__info-explorador" id="profile-info">
                  {currentUser?.about}
                </p>
              </div>
              <img
                className="profile__add-button"
                src={addButton}
                alt="botonagregar"
                id="add-button"
                onClick={() => onOpenPopup(newCardPopup)}
              />
            </div>
          </div>
        </div>
        <section className="element">
          {cards?.map((card) => (
            <Card
              card={card}
              key={card._id}
              handleOpenImagePopup={handleOpenImagePopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
        {popup && (
          <Popup onClose={onClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}
