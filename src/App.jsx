import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./Page/HomePage";
import SignInPage from "./Page/SignInPage";
import RegisterPage from "./Page/RegisterPage";
import Wrapper from "./components/Wrapper";
import UserPage from "./Page/UserPage";

import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route index element={<Navigate to="/Home" replace />} />
            <Route path="Home" element={<HomePage />} />
          </Route>
          <Route path="/UserPage/:uid" element={<UserPage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
