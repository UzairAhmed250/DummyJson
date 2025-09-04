import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import { auth, onAuthStateChanged } from "../config";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    isAuthenticated: boolean;
    loader: boolean;

}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loader , setLoader] = useState(true)
        
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
          if (currentuser) {
            setUser(currentuser);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            console.log("No user logged in");
          }
          setLoader(false);
        });
      
        return () => unsubscribe();
      }, []);
      
    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, loader }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
