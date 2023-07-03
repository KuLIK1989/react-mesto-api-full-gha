import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }
  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="upd-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__edit">
        <label className="form__field">
          <input
            type="url"
            placeholder="ссылка на аватар"
            id="avatar"
            name="avatar"
            className="form__item form__item_type_avatar"
            required
            ref={avatarRef}
          />
          <span className="error" id="avatar-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
