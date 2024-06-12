import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <nav className="header__nav wrapper">
        <ul className="header__nav-left">
          <li className="header__nav_item">
            <Link to='/' className="link">.главная</Link>
          </li>
          <li className="header__nav_item">
            <Link to='/tables' className="link">.список столов</Link>
          </li>
        </ul>

        <ul className="header__nav-right">
          <li className="header__nav_item">
            <a className="link">.выйти</a>
          </li>
          <li className="header__nav_item ">
            <Link to='/profile' className="link">
              .профиль<div className="header__nav_circle avatar"></div>
            </Link>
          </li>
        </ul>

        <ul className="header__nav-right">
          <li className="header__nav_item">
            <Link to='/login' className="link">.войти</Link>
          </li>
          <li className="header__nav_item">
            <Link to='/registration' className="link">.зарегистрироваться</Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
