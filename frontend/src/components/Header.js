import { FaAlignRight } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.svg";

const Header = ({ title, userEmail, onLogout, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="header__center">
        <img src={logo} alt="Logo of Around the U.S" className="header__logo" />

        <button type="button" className="header__button" onClick={handleToggle}>
          <FaAlignRight className="nav-icon" />
        </button>

        <ul className={isOpen ? "header__nav show-nav" : "header__nav"}>
          {userEmail && (
            <li>
              <p className="header__email">{userEmail}</p>
            </li>
          )}
          <li>
            <Link to={link} onClick={onLogout} className="header__logout">
              {title}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
