import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__edit">
        <label className="form__field">
          <input
            required
            minLength="2"
            maxLength="40"
            className="form__item form__item_type_name"
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            value={name || ""}
            onChange={handleNameChange}
          />
          <span className="error" id="name-error" />
        </label>
        <label className="form__field">
          <input
            required
            minLength="2"
            maxLength="200"
            className="form__item form__item_type_about"
            id="status"
            name="about"
            type="text"
            placeholder="Статус"
            value={description || ""}
            onChange={handleDescriptionChange}
          />
          <span className="error" id="status-error" />
        </label>
      </fieldset>
      <span className="error" id="status-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
