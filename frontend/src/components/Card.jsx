import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardClick, onCardLike, onCardDeleteConfirm, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardRemoveClassName = `card__button-trash ${
    isOwn ? "card__button-trash_visible" : ""
  }`;
  const cardLikeClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDeleteConfirm(card);
  }
  return (
    <div className="card">
      <button
        className={cardRemoveClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        alt="фото"
        src={card.link}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__description">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__name">
          <button
            type="button"
            className={cardLikeClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">{Object.keys(card.likes).length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
