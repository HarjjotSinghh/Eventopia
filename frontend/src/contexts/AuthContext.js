import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    // console.log("Dispatched action:", action);
    switch(action.type) {
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, { user: null });
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const userName = localStorage.getItem("userName");
      const name = localStorage.getItem("name");
  
      if (token && email && userName && name) {
        dispatch({
          type: "LOGIN",
          payload: {
            token,
            email,
            userName,
            name
          }
        });
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("token", state.user?.token || "");
      localStorage.setItem("email", state.user?.email || "");
      localStorage.setItem("userName", state.user?.userName || "");
      localStorage.setItem("name", state.user?.name || "");
    }, [state.user]);
  
    // console.log("AuthContext state: ", state);
    
    return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    );
  };