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

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);



    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const starCountRef = ref(database, `admin/${currentUser.uid}`);
                onValue(starCountRef, (snapshot) => {
                    const docu = snapshot.val() ? snapshot.val() : {};
                    const role = docu.role ? docu.role : null;
                    const name = docu.name ? docu.name : null;
                    const readafiliados = docu.readafiliados ? docu.readafiliados : null;
                    const editafiliados = docu.editafiliados ? docu.editafiliados : null;
                    const deleteafiliados = docu.deleteafiliados
                        ? docu.deleteafiliados
                        : null;
                    const changepoints = docu.changepoints ? docu.changepoints : null;
                    const readregisternewcompanies = docu.readregisternewcompanies
                        ? docu.readregisternewcompanies
                        : null;
                    const readalliedcompanies = docu.readalliedcompanies
                        ? docu.readalliedcompanies
                        : null;
                    const editcompanies = docu.editcompanies ? docu.editcompanies : null;
                    const deletecompanies = docu.deletecompanies
                        ? docu.deletecompanies
                        : null;
                    const moreinfocompanies = docu.moreinfocompanies
                        ? docu.moreinfocompanies
                        : null;
                    const readadministrativeportfolio = docu.readadministrativeportfolio
                        ? docu.readadministrativeportfolio
                        : null;
                    const administrativepaymentmethod = docu.administrativepaymentmethod
                        ? docu.administrativepaymentmethod
                        : null;
                    const readstatisticspointspermonth = docu.readstatisticspointspermonth
                        ? docu.readstatisticspointspermonth
                        : null;
                    const readcompaniespointsstatistics =
                        docu.readcompaniespointsstatistics
                            ? docu.readcompaniespointsstatistics
                            : null;
                    const readreportspointspercustomer = docu.readreportspointspercustomer
                        ? docu.readreportspointspercustomer
                        : null;
                    const readreportspointsbycompanies = docu.readreportspointsbycompanies
                        ? docu.readreportspointsbycompanies
                        : null;
                    const readreportspointsbycity = docu.readreportspointsbycity
                        ? docu.readreportspointsbycity
                        : null;
                    const readoverallhistory = docu.readoverallhistory
                        ? docu.readoverallhistory
                        : null;
                    const readhistorytable = docu.readhistorytable
                        ? docu.readhistorytable
                        : null;
                    const userData = {
                        name: name,
                        email: currentUser.email,
                        uid: currentUser.uid,
                        role: role,
                        readafiliados: readafiliados,
                        editafiliados: editafiliados,
                        deleteafiliados: deleteafiliados,
                        changepoints: changepoints,
                        readregisternewcompanies: readregisternewcompanies,
                        readalliedcompanies: readalliedcompanies,
                        editcompanies: editcompanies,
                        deletecompanies: deletecompanies,
                        moreinfocompanies: moreinfocompanies,
                        readadministrativeportfolio: readadministrativeportfolio,
                        administrativepaymentmethod: administrativepaymentmethod,
                        readstatisticspointspermonth: readstatisticspointspermonth,
                        readcompaniespointsstatistics: readcompaniespointsstatistics,
                        readreportspointspercustomer: readreportspointspercustomer,
                        readreportspointsbycompanies: readreportspointsbycompanies,
                        readreportspointsbycity: readreportspointsbycity,
                        readoverallhistory: readoverallhistory,
                        readhistorytable: readhistorytable,
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
