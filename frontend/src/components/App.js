import { useEffect, useState, useMemo } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Register from './Register';
import Login from './Login';
import * as auth from '../utils/auth';
import Api from '../utils/api';
import avatar from '../images/avatar.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const history = useHistory();

  // Context for Current User
  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  // Popup States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  const [isPreviewImagePopupOpen, setIsPreviewImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleConfirmDeleteClick = () => setIsConfirmDeletePopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsPreviewImagePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  // Image preview
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsPreviewImagePopupOpen(true);
  };

  // Authentication and Authorization
  const [loggedIn, setLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [isSucceeded, setIsSucceeded] = useState(false);

  const [jwt, setJwt] = useState('');

  const api = useMemo(
    () =>
      new Api({
        baseUrl: 'https://api.hulyak.students.nomoreparties.site',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      }),
    [jwt]
  );

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSucceeded(true);
          history.push('/signin');
        } else {
          setIsSucceeded(false);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setInfoTooltipOpen(true));
  };

  // if the user has a token in localStorage,
  // this function will check that the user has a valid token
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          setIsSucceeded(true);
          setJwt(jwt);
          history.push('/');
        })
        .catch((err) => console.error(err));
    } else {
      setLoggedIn(false);
    }
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (!res) {
          setLoggedIn(false);
          setIsSucceeded(false);
        }
        handleTokenCheck();
      })
      .catch((err) => {
        console.log(err);
        setIsSucceeded(false);
      })
      .finally(() => setInfoTooltipOpen(true));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/signin');
  };

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, []);

  // load the project with cards and user information
  useEffect(() => {
    if (jwt) {
      api
        .getUserData()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getInitialCards()
        .then((data) => {
          setCards(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt, CurrentUserContext]);

  // API CALLS
  const handleCardLike = (card) => {
    const isLiked =
      card.likes !== undefined ? card.likes.includes(currentUser._id) : false;
    const handleLike = !isLiked
      ? api.addLike(card._id)
      : api.deleteCard(card._id);

    // Check one more time if this card was already liked
    // const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    // api
    // .changeLikeCardStatus(card._id, !isLiked)
    handleLike
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => console.error(e));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateUser = (userData) => {
    api
      .setUserInfo({ ...userData })
      .then((data) => {
        setCurrentUser({ ...data.data });
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setUserAvatar(avatar.avatar)
      .then((data) => {
        setCurrentUser({ ...data.data });
      })
      .catch((err) => console.error(err));
  };

  const handleAddPlaceSubmit = (place) => {
    api
      .addCard({ ...place })
      .then((card) => {
        setCards([card.data, ...cards]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onConfirmDeleteClick={handleConfirmDeleteClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onLogoutClick={handleLogout}
          userEmail={userEmail}
        />
        <Route path="/signup">
          <Header title="Sign In" link="/signin" />
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/signin">
          <Header title="Sign Up" link="/signup" />
          <Login onLogin={handleLogin} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
        </Route>
      </Switch>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        name="infoTooltip"
        success={isSucceeded}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        name="confirm"
        title="Are you sure?"
        buttonText="Yes"
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isPreviewImagePopupOpen}
        name="preview"
      />

      <PopupWithForm
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        name="confirm"
        title="Are you sure?"
        buttonText="Yes"
      />
      {/* <Footer /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
