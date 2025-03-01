import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Css/Header.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleUserPageClick = () => {
    if (user) {
      navigate(`/UserPage/${user.uid}`);
    } else {
      navigate("/SignIn");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const ActiveLinks = (e) => {
    const links = document.querySelectorAll(".Header__link");
    if (e.target.classList.contains("Header__link")) {
      links.forEach((item) => item.classList.remove("active"));
      e.target.classList.add("active");
    }
  };

  return (
    <>
      <div className="Header">
        <div className="container">
          <div className="Header__container">
            <div className="Header__title">
              <h1>
                <NavLink to="/Home">FinanceHub</NavLink>
              </h1>
            </div>
            <div className="Header__burger">
              <button
                className={`Header__burger-menu ${menuOpen ? "open" : ""}`}
                onClick={toggleMenu}
              >
                <div className="Header__burger-menu-span"></div>
                <div className="Header__burger-menu-span"></div>
                <div className="Header__burger-menu-span"></div>
              </button>
              <div className="Header__nav">
                <ul
                  className={`Header__list ${menuOpen ? "activeList" : ""}`}
                  onClick={ActiveLinks}
                >
                  <li className="Header__item">
                    <NavLink
                      to="/Home"
                      className={({ isActive }) =>
                        isActive ? "Header__link active" : "Header__link"
                      }
                    >
                      Главная
                    </NavLink>
                  </li>
                  <li className="Header__item">
                    <button
                      className="Header__link"
                      onClick={handleUserPageClick}
                    >
                      Моя страница
                    </button>
                  </li>
                  <li className="Header__item">
                    <NavLink to="/" className="Header__link">
                      Поддержка
                    </NavLink>
                  </li>
                  <div className="Header__buttons">
                    <NavLink to="/SignIn">
                      <button className="Header__button--sign-in">Войти</button>
                    </NavLink>
                    <NavLink to="/Register">
                      <button className="Header__button--sign-up">
                        Зарегестрироваться
                      </button>
                    </NavLink>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
