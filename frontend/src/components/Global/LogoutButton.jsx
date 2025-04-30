import React from "react";
import { Button } from "@mantine/core";
import { useDispatch } from "react-redux";
import { authActions } from './../../store/reducers/authReducer';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the signout action to clear user data from Redux store
    dispatch(authActions.signout());

    // Optionally clear tokens from localStorage or cookies
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Redirect user to the SignIn page
    navigate("/");
  };

  return (
    <Button color="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
