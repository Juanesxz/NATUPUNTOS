import React from 'react'
import NewCompaniesAdmin from './NewCompaniesAdmin'
import NewCompaniesUser from './NewCompaniesUser'
import { useAuth } from '../../context/authContext'



function NewCompanies() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === "ADMINISTRADOR" ? <NewCompaniesAdmin /> : <NewCompaniesUser />}
        </div>
    )
}

export default NewCompanies