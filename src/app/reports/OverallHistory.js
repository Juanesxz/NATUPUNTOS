import React from 'react'
import { useAuth } from '../../context/authContext';
import OverallHistoryAdmin from './OverallHistoryAdmin';
import OverallHistoryUser from './OverallHistoryUser';

function OverallHistory() {
    const { user } = useAuth();
    return (
        <div>
            {
                user.role === "ADMINISTRADOR" ? (
                    <OverallHistoryAdmin />
                ) : (
                    <OverallHistoryUser />
                )
            }
        </div>
    )
}

export default OverallHistory