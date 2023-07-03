import successIcon from "../image/Union_like.svg";
import failIcon from "../image/Union_dislike.svg";
import React from "react";

function InfoToolTip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        {props.isSuccess ? (
          <>
            <img
              src={`${successIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${failIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
