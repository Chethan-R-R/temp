import React from "react";
import { useState, useContext, createContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext(null);

function AuthenticationProvider({ children }) {
    const navigate = useNavigate();
    const [userData,setUserData] = useState({
    email:undefined,
    password:undefined
    })

  const [isAuthenticated,setAuthentication] = useState(false);

  function signUp(email,password){
    setUserData({
        email:email,
        password:password
    })
    alert("registered successfully")
    navigate("/authentication/sign-in")
  }

  function signIn(email,password){
    console.log(email,password)
    if(email==userData.email && password==userData.password){
        setAuthentication(true)
        navigate("/dashboard")
    }
    else alert("email or password is incorrect");
  }

  return <AuthenticationContext.Provider value={{userData,isAuthenticated,signUp,signIn}}>{children}</AuthenticationContext.Provider>;
}

AuthenticationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

function authenticationController() {
    const context = useContext(AuthenticationContext);

    if (!context) {
      throw new Error("authentication context should be used inside the AuthenticationContext.Provider.");
    }

    return context;
}

export {AuthenticationProvider,authenticationController}