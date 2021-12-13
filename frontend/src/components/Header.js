import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.svg";

const Header = ({ title, userEmail, onLogout, link }) => {
  // const [toggleMenu, setToggleMenu] = useState(false);

  // const handleToggleButton = () => {
  //   setToggleMenu(!toggleMenu);
  // };

  return (
    <header className="header">
      <img src={logo} alt="Logo of Around the U.S" className="header__logo" />
      {/* <FontAwesomeIcon icon={faBars} size="lg" onClick={handleToggleButton} /> */}
      {/* {toggleMenu && ( */}
      <ul className="header__nav">
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
      {/* )} */}
    </header>
  );
};

export default Header;
