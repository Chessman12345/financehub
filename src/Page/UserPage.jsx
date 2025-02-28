import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, database, ref, get } from "../firebase/config";
import { signOut } from "firebase/auth";

const UserPage = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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
    <div>
      {userData ? (
        <div>
          <h1>Привет, {userData.name || "Пользователь"}!</h1>
          <p>Email: {userData.email}</p>
          <p>UID: {userData.uid}</p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default UserPage;
