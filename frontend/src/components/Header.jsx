import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import logo from "../image/logo.png";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        ></Route>
        <Route
          exact
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        ></Route>
        <Route
          exact
          path="/"
          element={
            <div className="header__user-info">
              <p className="header__email">{props.email}</p>
              <Link
                to="/sign-in"
                className="header__link"
                onClick={props.onSignOut}
              >
                Выйти
              </Link>
            </div>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
