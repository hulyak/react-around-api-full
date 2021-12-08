const ImagePopup = ({ name, isOpen, card, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={handleOutsideClick}
    >
      <div className={`popup__container popup__container_${name}`}>
        <button
          type="button"
          className="popup__close-button popup__close-button_preview"
          aria-label="Close button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link || "#"}
          alt="bigger size of the card with its link and name"
        />
        <p className="popup__preview-title">{card.name}</p>
      </div>
    </section>
  );
};

export default ImagePopup;
