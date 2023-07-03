import PopupWithForm from "./PopupWithForm";
function ConfirmPopup({ isOpen, onClose, onDeleteCard, card }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default ConfirmPopup;
