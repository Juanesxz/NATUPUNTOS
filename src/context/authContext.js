import React, { useContext, createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, database, auth2 } from "../app/Firebase";


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
        createUserWithEmailAndPassword(auth2, email, password);

    async function login(email, password) {
        signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const starCountRef = ref(database, `admin/${currentUser.uid}`);
                onValue(starCountRef, (snapshot) => {
                    const docu = snapshot.val() ? snapshot.val() : {};
                    const role = docu.role ? docu.role : null;
                    const name = docu.name ? docu.name : null;
                    const userData = {
                        name: name,
                        email: currentUser.email,
                        uid: currentUser.uid,
                        role: role,
                    };
                    setUser(userData);
                    setLoading(false);
                });
            } else {
                const userData = {
                    name: null,
                    email: null,
                    uid: null,
                    role: null,
                };

                setUser(userData);
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
