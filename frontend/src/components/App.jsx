import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/Auth";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [deletingCard, setDeletingCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [IsInfoToolTip, setInfoToolTip] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };
  function handleRegister() {
    setInfoToolTip(true);
  }
  function onSuccess(isSuccess) {
    setIsSuccessful(isSuccess);
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(avatar) {
    api
      .setAvatar({ avatar: avatar })
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeCard({
        idCard: card._id,
        methodCardLike: isLiked ? "DELETE" : "PUT",
      })
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    api
      .getInitialData()
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmPopupOpen(false);
    setInfoToolTip(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletingCard(card);
  }

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setDeletingCard(null);
        setCards((newArray) =>
          newArray.filter((item) => card._id !== item._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSignout() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    navigate.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignout} loggedIn={loggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDeleteConfirm={handleCardDeleteClick}
                cards={cards}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register handleRegister={handleRegister} onSuccess={onSuccess} />
            }
          ></Route>
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          ></Route>
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeleteCard}
          card={deletingCard}
        />
        <InfoToolTip
          isOpen={IsInfoToolTip}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
