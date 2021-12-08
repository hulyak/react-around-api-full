const PopupWithForm = ({
  title,
  name,
  buttonText,
  isOpen,
  children,
  onClose,
  onSubmit,
}) => {
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
          className="popup__close-button popup__close-button_profile"
          aria-label="Close button"
          onClick={onClose}
        />
        <form
          name={name}
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
