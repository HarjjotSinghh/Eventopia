 import { useAuthContext } from "./useAuthContext";

 export const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () => {
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        
        dispatch({type: "LOGOUT"});
    }
    return { logout };
 
 }