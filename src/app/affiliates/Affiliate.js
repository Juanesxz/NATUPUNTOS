import React from "react";
import { useAuth } from "../../context/authContext";
import AffiliateAdmin from "./AffiliateAdmin";
import AffiliateUser from "./AffiliateUser";

function Affiliate() {

    const { user } = useAuth();



    return (
        <div>
            {user.role === "ADMINISTRADOR" ? <AffiliateAdmin /> : <AffiliateUser />}
        </div>
    );
}

export default Affiliate;
