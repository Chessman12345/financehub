import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

function Wrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Wrapper;
