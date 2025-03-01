import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database, provider, ref, set } from "../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import GoogleIcon from "../../icon/google.svg";

import "../Css/RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Пароли не совподают!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        password: password,
      });

      navigate(`/UserPage/${user.uid}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        uid: user.uid,
        email: user.email,
      });

      navigate(`/UserPage/${user.uid}`);
    } catch {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="RegisterPage">
        <div className="RegisterPage__header">
          <div className="RegisterPage__header--title">
            <h1>
              <Link to="/Home">FinanceHub</Link>
            </h1>
          </div>
          <div className="RegisterPage__header--haveAnAccount">
            <p>У вас уже есть аккаунт?</p>
            <Link to="/SignIn">
              <button className="RegisterPage__header--haveAnAccount-signin">
                Войти
              </button>
            </Link>
          </div>
        </div>
        <div className="RegisterPage__main">
          <div className="RegisterPage__main-title">
            <h2>Зарегестрироваться</h2>
          </div>
          <div className="RegisterPage__main-gmail">
            <form onClick={handleRegister}>
              <div className="RegisterPage__main-google">
                <div className="RegisterPage__main-google-icon">
                  <img src={GoogleIcon} alt="" />
                </div>
                <button
                  className="RegisterPage__main-google-text"
                  onClick={handleGoogleLogin}
                >
                  зарегистрироваться через Google
                </button>
              </div>
              <div className="RegisterPage__main-gmail-input">
                <label>Имя</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="RegisterPage__main-gmail-input">
                <label>Электронная почта</label>

                <input
                  type="email"
                  placeholder="test@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="RegisterPage__main-gmail-input">
                <label>Пароль</label>
                <input
                  type="password"
                  placeholder="минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="RegisterPage__main-gmail-input">
                <label>Повторите пароль</label>
                <input
                  type="password"
                  placeholder="повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="RegisterPage__main-gmail-signup" type="submit">
                Зарегестрироваться
              </button>
              <div className="RegisterPage__main-gmail-signin">
                <h5>
                  У вас уже есть аккаунт? <Link to="/SignIn">Войти</Link>
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
