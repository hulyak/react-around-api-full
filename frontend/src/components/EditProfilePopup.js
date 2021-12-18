import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  // show the current user's info from the context
  const currentUser = useContext(CurrentUserContext);

  const [formFields, setFormFields] = useState({
    name: '',
    about: '',
  });

  const { name, about } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // After loading the current user from the API their data will be used in managed components
  useEffect(() => {
    setFormFields({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the values of the managed components to the external handler
    onUpdateUser(formFields);
    setFormFields({ name: '', link: '' });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="edit-profile"
      title="Edit Profile"
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field" htmlFor="name-input">
        <input
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          id="name-input"
          required
          value={name || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error name-input-error" />
      </label>
      <label className="popup__form-field" htmlFor="job-input">
        <input
          type="text"
          name="about"
          className="popup__input popup__input_type_job"
          placeholder="Job"
          minLength="2"
          maxLength="200"
          id="job-input"
          required
          value={about || ''}
          onChange={handleChange}
        />
        <span className="popup__input-error job-input-error" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
