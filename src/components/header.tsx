import React from 'react';
import { Link } from 'react-router-dom';
import NavList from './nav-list';

const Header: React.FC = () => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
          </Link>
        </div>
        <NavList />
      </div>
    </div>
  </header>
);

export default Header;
