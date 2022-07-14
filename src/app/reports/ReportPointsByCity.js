import React from 'react'
import { useAuth } from '../../context/authContext';
import ReportPointsByCityAdmin from './ReportPointsByCityAdmin';
import ReportPointsByCityUser from './ReportPointsByCityUser';


function ReportPointsByCity() {
    const { user } = useAuth();
    return (
        <div>
            {
                user.role === "ADMINISTRADOR" ? (
                    <ReportPointsByCityAdmin />
                ) : (
                    <ReportPointsByCityUser />
                )
            }
        </div>
    )
}

export default ReportPointsByCity