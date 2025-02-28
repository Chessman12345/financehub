import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, database, ref, get, provider, set } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import GoogleIcon from "../../icon/google.svg";

import "../Css/SignInPage.css";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);
      let userExists = false;

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.email === email) {
            userExists = true;
          }
        });
      }

      if (!userExists) {
        console.log("Аккаунт не найден. Зарегистрируйтесь.");
        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate(`/UserPage/${userCredential.user.uid}`);
    } catch (error) {
      console.log("Ошибка входа: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const tempUserCredential = await signInWithPopup(auth, provider);
      const tempUser = tempUserCredential.user;

      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);
      let userExists = false;

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          if (userData.email === tempUser.email) {
            userExists = true;
          }
        });
      }

      if (!userExists) {
        await signOut(auth);
        console.log(
          "Этот Google-аккаунт не зарегистрирован. Сначала зарегистрируйтесь."
        );
        return;
      }

      navigate(`/UserPage/${tempUser.uid}`);
    } catch (error) {
      console.log("Ошибка входа через Google: " + error.message);
    }
  };

  return (
    <div className="SignInPage">
      <div className="SignInPage__header">
        <div className="SignInPage__header--title">
          <h1>
            <Link to="/Home">FinanceHub</Link>
          </h1>
        </div>
        <div className="SignInPage__header--haveAnAccount">
          <p>У вас нет аккаунта?</p>
          <Link to="/Register">
            <button className="SignInPage__header--haveAnAccount-signin">
              Зарегестрироваться
            </button>
          </Link>
        </div>
      </div>
      <div className="SignInPage__main">
        <div className="SignInPage__main-gmail">
          <form onClick={handleLogin}>
            <div className="SignInPage__main-title">
              <h2>Войти</h2>
            </div>
            <div className="SignInPage__main-google">
              <button
                className="SignInPage__main-google-button"
                onClick={handleGoogleLogin}
              >
                <div className="SignInPage__main-google-icon">
                  <img src={GoogleIcon} alt="" />
                </div>
                <div className="SignInPage__main-google-text">
                  Войти при помощи Google
                </div>
              </button>
            </div>
            <div className="SignInPage__main-gmail-input">
              <label>Электронная почта</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="SignInPage__main-gmail-input">
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="SignInPage__main-gmail-signup" type="submit">
              Войти
            </button>
            <div className="SignInPage__main-gmail-signin">
              <h5>
                У вас нет аккаунта?
                <Link to="/Register"> Зарегестрироваться</Link>
              </h5>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
