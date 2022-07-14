import React from "react";
import { useAuth } from "../../context/authContext";
import ReportPointsForCustomersAdmin from "./ReportPointsForCustomersAdmin";
import ReportPointsForCustomersUser from "./ReportPointsForCustomersUser";

function ReportPointsForCustomers() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <ReportPointsForCustomersAdmin />
            ) : (
                <ReportPointsForCustomersUser />
            )}
        </div>
    );
}

export default ReportPointsForCustomers;
