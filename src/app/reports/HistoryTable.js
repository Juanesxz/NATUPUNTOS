import React from 'react'
import { useAuth } from '../../context/authContext';
import HistoryTableAdmin from './HistoryTableAdmin';
import HistoryTableUser from './HistoryTableUser';
function HistoryTable() {
    const { user } = useAuth();
    return (
        <div>
            {
                user.role === "ADMINISTRADOR" ? (
                    <HistoryTableAdmin />
                ) : (
                    <HistoryTableUser />
                )
            }
        </div>
    )
}

export default HistoryTable