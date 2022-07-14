import React from 'react'
import { useAuth } from '../../context/authContext'
import GraphPointsPerMonthAdmin from './GraphPointsPerMonthAdmin';
import GraphPointsPerMonthUser from './GraphPointsPerMonthUser';


function GraphPointsPerMonth() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === 'ADMINISTRADOR' ? <GraphPointsPerMonthAdmin /> : <GraphPointsPerMonthUser />}
        </div>
    )
}

export default GraphPointsPerMonth