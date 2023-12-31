function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__image-container">
        <button onClick={props.onClose} className="popup__close-button" />
        <img
          className="popup__image"
          src={props.card ? props.card.link : ""}
          alt={props.card ? props.card.name : ""}
        />
        <p className="popup__description">
          {props.card ? props.card.name : ""}
        </p>
      </div>
    </div>
  );
}
export default ImagePopup;
