import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      return;
    }
    resetForm();
    onLogin(user.email, user.password);
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <section className="login">
      <h2 className="login__title">Log in</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="login__form-field">
          <input
            className="login__input"
            placeholder="Email"
            type="email"
            name="email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="login__form-field">
          <input
            className="login__input"
            placeholder="Password"
            type="password"
            name="password"
            minLength={2}
            maxLength={10}
            required
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button className="login__button" type="submit">
          Log In
        </button>
      </form>

      <p className="login__text">
        Not a member yet?
        <Link to="/signup" className="login__link">
          Sign up here!
        </Link>
      </p>
    </section>
  );
};

export default Login;
