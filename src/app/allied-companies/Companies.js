import React from 'react'
import { useAuth } from "../../context/authContext";
import CompaniesAdmin from "./CompaniesAdmin";
import CompaniesUser from "./CompaniesUser";

function Companies() {

    const { user } = useAuth();

    return (
        <div>
            {user.role === "ADMINISTRADOR" ? <CompaniesAdmin /> : <CompaniesUser />}
        </div>
    )
}

export default Companies