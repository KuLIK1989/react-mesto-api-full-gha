import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__edit">
        <label className="form__field">
          <input
            required=""
            minLength={2}
            maxLength={30}
            className="form__item"
            id="name-place"
            name="name"
            type="text"
            placeholder="Название"
            value={name}
            onChange={handleNameChange}
          />
          <span className="error" id="name-place-error" />
        </label>
        <label className="form__field">
          <input
            required=""
            className="form__item"
            id="link-place"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            value={link}
            onChange={handleLinkChange}
          />
          <span className="error" id="link-place-error" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
