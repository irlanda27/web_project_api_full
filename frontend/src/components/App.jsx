import React, { useState, useEffect } from "react";
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
  const [currentUser, setCurrentUser] = useState({});
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
    setCards((prev) => prev.filter((c) => c._id !== card._id));
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
      .then((res) => {
        console.log("Registro exitoso:", res);
        openTooltip("success", "¡Correcto! Ya estás registrado.");
        setTimeout(() => {
          closeTooltip();
          navigate("/signin");
        }, 1500);
      })
      .catch((err) => {
        console.error("Error en registro:", err);
        openTooltip("error", "Uy, algo salió mal. Por favor, inténtalo de nuevo.");
      });
  }

  // ---- Login ----
  const handleLogin = ({ email, password }) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          return auth.checkToken(data.token);
        }
        return Promise.reject("No se recibió token");
      })
      .then((res) => {
        if (res && res.data) {
          setCurrentUser(res.data);
          setUserEmail(res.data.email);
          navigate("/");
        }
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

  // ---- Check token al cargar ----
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData.data || userData);
          setUserEmail((userData.data || userData).email);
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
        .catch((err) => {
          console.error("Error al obtener las tarjetas:", err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onSignOut={handleSignOut} loggedIn={loggedIn} />

        <Routes>
          <Route path="/signup" element={<Register onRegister={handleRegister} />} />
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
