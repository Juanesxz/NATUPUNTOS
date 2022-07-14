import React from "react";
import { useAuth } from "../../context/authContext";
import AdministrativePortfolioAdmin from "./AdministrativePortfolioAdmin";
import AdministrativePortfolioUser from "./AdministrativePortfolioUser";

function AdministrativePortfolio() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <AdministrativePortfolioAdmin />
            ) : (
                <AdministrativePortfolioUser />
            )}
        </div>
    );
}

export default AdministrativePortfolio;
