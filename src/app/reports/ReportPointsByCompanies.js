import React from "react";
import { useAuth } from "../../context/authContext";
import ReportPointsByCompaniesAdmin from "./ReportPointsByCompaniesAdmin";
import ReportPointsByCompaniesUser from "./ReportPointsByCompaniesUser";

function ReportPointsByCompanies() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <ReportPointsByCompaniesAdmin />
            ) : (
                <ReportPointsByCompaniesUser />
            )}
        </div>
    );
}

export default ReportPointsByCompanies;
