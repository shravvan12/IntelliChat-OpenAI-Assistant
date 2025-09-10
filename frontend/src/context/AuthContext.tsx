import {createContext,useEffect,useState,useContext, type ReactNode} from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";

type User={
    name : string;
    email : string;
}
type UserAuth={
    isLoggedIn : boolean;
    user: User | null;
    login: (email : string ,password : string)=>Promise<void>;
    signup: (name : string, email : string, password : string)=>Promise<void>;
    logout: ()=>Promise<void>;
}
const AuthContext = createContext<UserAuth|null>(null);
export const AuthProvider = ({children}:{children: ReactNode})=>{
    const [user , setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        //fetch if the users cookies are valid then skip the logic 
        async function checkstatus() {
            const data = await checkAuthStatus();
            if(data){
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
            }
        };
        checkstatus();

    },[]);
    const login = async(email : string ,password : string)=>{
        const data = await loginUser(email,password);
        if(data){
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
        }
    }
    const signup = async (name : string, email : string, password : string)=>{
        const data = await signupUser(name,email,password);
        if(data){
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
        }
    };
    const logout = async ()=>{
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const value ={
        user,
        isLoggedIn,
        login,
        signup,
        logout 
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = ()=>useContext(AuthContext);
