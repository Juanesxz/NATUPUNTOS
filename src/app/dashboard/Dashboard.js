import React from "react";
import { useAuth } from "../../context/authContext";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      {user.role === "ADMINISTRADOR" ? <DashboardAdmin /> : <DashboardUser />}
    </div>
  );
}

export default Dashboard;
