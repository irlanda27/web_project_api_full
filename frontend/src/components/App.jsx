import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Main from "./Main/Main";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Header from "./Header/Header";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({name:"irlanda" , link:"desarrolladora"});
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const [uiPopup, setUiPopup] = useState(null); // para los popups internos de Main (si los usas)
  const navigate = useNavigate();

  // ---- Helpers popup InfoTooltip ----
  const openTooltip = (type, message) =>
    setPopup({ open: true, type, message });
  const closeTooltip = () => setPopup((p) => ({ ...p, open: false }));

  // ---- UI popups (Main) ----
  const onOpenPopup = (popupData) => setUiPopup(popupData);
  const onClosePopup = () => setUiPopup(null);

  // ---- Tarjetas (mock/placeholder) ----
  const handleCardLike = (card) => {
    console.log("Like card:", card);
  };

  const handleCardDelete = (card) => {
    console.log("Delete card:", card);
    
    api
      .deleteCard(card._id)
      .then((cardsData) => setCards((prev) => prev.filter((c) => c._id !== cardsData.card._id)))
      .catch((err) => console.error("Error al obtener las tarjetas:", err));
  };

  const handleAddPlaceSubmit = (newCardData) => {
    console.log("Add new card:", newCardData);
    setCards((prev) => [newCardData, ...prev]);
  };

  const handleUpdateUser = (userData) => {
    console.log("Update user:", userData);
    setCurrentUser(userData);
    onClosePopup();
  };

  // ---- Registro ----
  function handleRegister(email, password) {
  auth
    .register(email, password)
    .then(() => {
      // registro ok
      openTooltip("success", "¡Correcto! Ya estás registrado.");
      setTimeout(() => {
        closeTooltip();
        navigate("/signin");
      }, 1200);
    })
    .catch((err) => {
      console.error("Error en registro:", err);
      openTooltip("error", "Uy, algo salió mal. Inténtalo de nuevo.");
    });
}

  // ---- Login ----
 const handleLogin = ({ email, password }) => {
  auth
    .login(email, password) // guarda el token adentro (según auth.js que te pasé)
    .then((token) => {
      // Por si tu login no guarda token internamente:
      if (token) localStorage.setItem("jwt", token);

      setLoggedIn(true);
      // Trae el usuario logueado
      return auth.checkToken(); // usa el token de localStorage
    })
    .then((user) => {
      // user viene directo (no user.data)
      setCurrentUser({name:"irlanda" , link:"desarrolladora"});
      setUserEmail(user.email || "");
      navigate("/");
    })
    .catch((err) => {
      console.error("Error durante login:", err);
      openTooltip("error", "Credenciales inválidas. Intenta de nuevo.");
    });
};
  // ---- Logout ----
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    setUserEmail("");
    navigate("/signin", { replace: true });
  }
console.log(currentUser, "currentUser en App");

function handleUpdateAvatar(avatarData) {
  console.log("Update avatar:", avatarData);
  api.changeAvatar(avatarData.avatar)
    .then(() => {
  setCurrentUser((prev) => ({ ...prev, avatar: avatarData.avatar }));
  onClosePopup();
})
.catch((err) => console.error("Error al actualizar el avatar:", err));
}


  // ---- Check token al cargar ----
 useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token) {
    auth
      .checkToken(token)
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);          // user directo
        setUserEmail(user.email || "");
      })
      .catch((err) => {
        console.error("Token inválido o expirado:", err);
        setLoggedIn(false);
      });
  }
}, []);

// ---- Traer tarjetas cuando está logueado ----
useEffect(() => {
  if (loggedIn) {
    api
      .getCards()
      .then((cardsData) => setCards(cardsData))
      .catch((err) => console.error("Error al obtener las tarjetas:", err));
  }
}, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, handleUpdateAvatar}}>
      <div className="page">
        <Header
          email={userEmail}
          onSignOut={handleSignOut}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                currentUser={currentUser}
                cards={cards}
                onOpenPopup={onOpenPopup}
                onClosePopup={onClosePopup}
                popup={uiPopup}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                setPopup={setUiPopup}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                handleUpdateUser={handleUpdateUser}
                userEmail={userEmail}
                onSignOut={handleSignOut}
              />
            }
          />
        </Routes>

        {/* InfoTooltip global */}
        <InfoTooltip
          isOpen={popup.open}
          isSuccess={popup.type === "success"}
          message={popup.message}
          onClose={closeTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
