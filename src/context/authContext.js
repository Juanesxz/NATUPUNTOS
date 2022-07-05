import React, { useContext, createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database } from "../app/Firebase";


const authContext = createContext();




export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("No hay proveedor de autenticación.");
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const login = async (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const starCountRef = ref(database, `admin/${currentUser.uid}`);
                onValue(starCountRef, (snapshot) => {
                    const docu = snapshot.val();
                    const role = docu.role;
                    const userData = {
                        email: currentUser.email,
                        uid: currentUser.uid,
                        role: role,
                    };
                    setUser(userData);
                    console.log(userData);
                    setLoading(false);
                });
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <authContext.Provider value={{ signup, login, user, logout, loading }}>
            {children}
        </authContext.Provider>
    );
}
