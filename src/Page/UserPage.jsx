import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth, database, ref, get } from "../firebase/config";
import { signOut } from "firebase/auth";

import "../Css/UserPage.css";

const UserPage = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [visiblePopupSettign, setVisiblePopupSettign] = useState(false);

  const navigate = useNavigate();

  const toggleVisiblePopupSettign = () => {
    setVisiblePopupSettign(!visiblePopupSettign);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = ref(database, "users/" + uid);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      }
    };

    fetchUserData();
  }, [uid]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/Home");
  };

  return (
    <div className="UserPage">
      {userData ? (
        <div className="container-userpage">
          <div className="UserPage__container">
            <div className="UserPage__header">
              <div className="UserPage__header-title">
                <h1>
                  <Link to="/Home">FinanceHub</Link>
                </h1>
                <div className="UserPage__header-title-popup-wrapper">
                  <p>{userData.name || "Пользователь" || editName} </p>
                </div>
              </div>
              <div className="UserPage__header-buttons">
                <button className="UserPage__header-button-income">
                  <span>+</span> Доход
                </button>
                <button className="UserPage__header-button-expense">
                  <span>-</span> Расход
                </button>
              </div>
              <div className="UserPage__header-setting">
                <button
                  onClick={toggleVisiblePopupSettign}
                  className={
                    visiblePopupSettign
                      ? "UserPage__header-setting-button active"
                      : "UserPage__header-setting-button"
                  }
                >
                  <img src="https://my.finmap.online/static/media/setting.f27c83c2.svg" />
                </button>
                <div
                  className={
                    visiblePopupSettign
                      ? "active-marker"
                      : "active-marker disable"
                  }
                ></div>
                {visiblePopupSettign && (
                  <div className="UserPage__header-title-profile">
                    <div className="UserPage__header-title-profile-gmail">
                      <p>{userData.email}</p>
                    </div>
                    <div className="UserPage__header-title-profile-page">
                      <div className="UserPage__header-title-profile-page-title">
                        <p>Профиль</p>
                      </div>
                      <div className="UserPage__header-title-profile-page-exit">
                        <button
                          onClick={handleLogout}
                          className="UserPage__header-title-profile-page-exit--button"
                        >
                          <img
                            src="https://my.finmap.online/static/media/log_out.ab5f025e.svg"
                            alt=""
                          />
                          Выйти
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper__loader-logo">
          <p>Загрузка...</p>
        </div>
      )}
    </div>
  );
};

export default UserPage;
