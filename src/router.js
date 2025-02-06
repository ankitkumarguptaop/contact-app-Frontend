import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import Home from "./pages/home/home";
import { useSelector } from "react-redux";

const Router = () => {
  const PrivateRouteAuth = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);

    if (!currentUser) {
      return children;
    }

    return <Navigate to="/home" />;
  };

  const PrivateRouteHome = ({ children }) => {
    const currentUser = useSelector((state) => state.auth.currentUser);

    if (currentUser) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouteAuth>
            <SignIn />
          </PrivateRouteAuth>
        }
      />
      <Route
        path="/signup"
        element={
          <PrivateRouteAuth>
            <SignUp />
          </PrivateRouteAuth>
        }
        // children={
        //   [{
        //     path:"",
        //     c
        //   }]
        // }
      />
      <Route
        path="/home"
        element={
          <PrivateRouteHome>
            <Home />
          </PrivateRouteHome>
        }
      />
    </Routes>
  );
};

export default Router;
