import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [formFields, setFormFields] = useState({ name: "", link: "" });
  const { name, link } = formFields;

  useEffect(() => {
    setFormFields({ name: "", link: "" });
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace(formFields);
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="add-card"
      title="New place"
      buttonText="Create"
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_title"
          placeholder="Title"
          required
          minLength="1"
          maxLength="30"
          id="title-input"
          value={name}
          onChange={handleChange}
        />
        <span className="popup__input-error title-input-error" />
      </label>

      <label className="popup__form-field">
        <input
          type="url"
          name="link"
          className="popup__input popup__input_type_image-link"
          placeholder="Image Link"
          required
          id="url-input"
          value={link}
          onChange={handleChange}
        />
        <span className="popup__input-error url-input-error" />
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
