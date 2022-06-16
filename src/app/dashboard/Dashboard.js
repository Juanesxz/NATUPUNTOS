import React from "react";
import { useAuth } from "../../context/authContext";

function Dashboard() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Solo soy Dashboard</h1>
    </div>
  );
}

export default Dashboard;
