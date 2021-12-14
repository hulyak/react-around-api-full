import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    resetForm();
    onRegister(user.email, user.password);
  };

  const resetForm = () => {
    setUser({
      email: '',
      password: '',
    });
  };

  return (
    <section className="register">
      <p className="register__title">Sign Up</p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="email" className="register__form-field">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            className="register__input"
          />
        </label>
        <label htmlFor="password" className="register__form-field">
          <input
            id="password"
            name="password"
            type="password"
            minLength={2}
            maxLength={40}
            required
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            className="register__input"
          />
        </label>
        {/* <label htmlFor="confirmPassword" className="register__form-field">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            minLength={2}
            maxLength={40}
            required
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="register__input"
          />
        </label> */}

        <button type="submit" className="register__button">
          Sign up
        </button>
      </form>

      <p className="register__text">
        Already a member?
        <Link to="signin" className="register__link">
          Log in here!
        </Link>
      </p>
    </section>
  );
};

export default Register;
