import React from 'react'
import { useAuth } from '../../context/authContext'
import GraphCompanyPointsAdmin from './GraphCompanyPointsAdmin';
import GraphCompanyPointsUser from './GraphCompanyPointsUser';


function GraphCompanyPoints() {
    const { user } = useAuth();

    return (
        <div>
            {user.role === 'ADMINISTRADOR' ? <GraphCompanyPointsAdmin /> : <GraphCompanyPointsUser />}
        </div>
    )
}

export default GraphCompanyPoints