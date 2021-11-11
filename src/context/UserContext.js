import React, { useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/UserReducer";
import axios from "axios";

const UserContext = React.createContext();
//crear user como variable global y hacerla igual al localStorage usando las funciones como en el curso
//beware googleUser becomes null everytime that i refresh
const baseUrl = "http://localhost:5000/user";
const initialState = {
  googleUser: null,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //WITH GOOGLE
  const loginWithGoogle = (result, token) => {
    dispatch({ type: "AUTH", payload: { result, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  //WITH FORM
  const signup = async (formData, navigate) => {
    console.log(formData);

    try {
      //sign up the user

      const { data } = await axios.post(`${baseUrl}/signup`, formData);
      dispatch({ type: "AUTH", payload: data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //login
  const signin = async (formData, navigate) => {
    try {
      //sign up the user
      const { data } = await axios.post(`${baseUrl}/signin`, formData);
      dispatch({ type: "AUTH", payload: data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserContext.Provider
      value={{ ...state, loginWithGoogle, logout, signup, signin }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
