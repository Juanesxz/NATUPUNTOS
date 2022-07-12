import React from "react";
import { useAuth } from "../../context/authContext";

function DashboardUser() {
    const { user } = useAuth();
    return (
        <div>
            {user.role === "SECRETARIA" ? (
                <div>
                    <h1>ROL SECRETARIA</h1>
                </div>
            ) : (
                <div>
                    <h1>NO TIENES PERMISOS PARA VER ESTE CONTENIDO</h1>
                </div>
            )}
        </div>
    );
}

export default DashboardUser;
