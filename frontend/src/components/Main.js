import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';

const Main = ({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onConfirmDeleteClick,
  cards,
  onCardLike,
  onCardDelete,
  userEmail,
  onLogoutClick,
}) => {
  console.log(cards);
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <Header
        onLogout={onLogoutClick}
        link="/"
        title="Log out"
        userEmail={userEmail}
      />
      <section className="profile">
        <div>
          <div
            className="profile__avatar-overlay"
            onClick={onEditAvatarClick}
          />
          <img
            src={currentUser.avatar}
            alt="old person with a red hat smiling to camera"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            aria-label="edit button"
            type="button"
            onClick={onEditProfileClick}
          />
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          aria-label="Add button"
          type="button"
          onClick={onAddPlaceClick}
        />
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onConfirmDeleteClick={onConfirmDeleteClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
