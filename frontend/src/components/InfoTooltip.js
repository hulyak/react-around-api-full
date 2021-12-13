import successIcon from "../images/success.svg";
import errorIcon from "../images/error.svg";

const InfoTooltip = ({ isOpen, onClose, name, success }) => {
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
        <div className="popup__tooltip">
          {success ? (
            <>
              <img className="popup__success" alt="success" src={successIcon} />
              <p className="popup__title">
                Success! You have now been registered.
              </p>
            </>
          ) : (
            <>
              <img className="popup__error" alt="error icon" src={errorIcon} />
              <p className="popup__title">
                Oops, something went wrong! Please try again.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoTooltip;
