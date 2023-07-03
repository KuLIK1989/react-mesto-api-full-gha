import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDeleteConfirm,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__change-avatar">
          <div className="profile__edit-avatar" onClick={onEditAvatar} />
          <img
            src={currentUser.avatar}
            alt="фото профиля"
            className="profile__avatar"
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            />
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </div>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteConfirm={onCardDeleteConfirm}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
