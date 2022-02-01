import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./pages/Login/login";
import Main from "./modules/common/components/layout/Main";

export const CleaningAppAdmin = () => {
  // const dispatch = useDispatch();
  const cleaningData = useSelector((state) => state.cleaning);
  console.log("this is cleaning data", cleaningData);
  if (!cleaningData.userLoggedIn) {
    return <LoginPage />;
  }
  return <Dashboard />;
};
