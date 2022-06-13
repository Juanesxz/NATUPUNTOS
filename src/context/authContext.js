import React, { useContext, createContext } from 'react';

export const authContext = createContext();


export const useAuth = () => {
    const context = useContext(authContext)
    return context
}


export function AuthProvider({ children }) {
    const user = {
        login: true,
    };


    return (
        <authContext.Provider value={{ user }} >
            {children}
        </authContext.Provider>
    )
}