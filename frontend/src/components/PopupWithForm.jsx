function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button"
        />
        <h3 className="form__title">{title}</h3>
        <form
          method="post"
          className="form"
          name={name}
          id={name}
          onSubmit={onSubmit}
        >
          {children}

          <button
            className="form__save-button"
            type="submit"
            name={`popup-form-submit_${name}`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
