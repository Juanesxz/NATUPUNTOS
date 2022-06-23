import React from "react";
import { useAuth } from "../../context/authContext";

function Dashboard() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(user);
  return (
    <div>
      <h1>Solo soy Dashboard  {user.email}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
