import React from "react";
import { useAuth } from '../context/authContext'

function ProfileSidebar() {
    const { user, loading } = useAuth();
    if (loading) {
        return <h4>cargando...</h4>;
    }
    return (
        <div className="profile-pic">
            <div className="count-indicator">
                <img
                    className="img-xs rounded-circle "
                    src={require("../assets/images/faces/face15.jpg")}
                    alt="profile"
                />
                <span className="count bg-success"></span>
            </div>
            <div className="profile-name">
                <h5 className="mb-0 font-weight-normal">{user.name}</h5>
                <span>{user.role}</span>
            </div>
        </div>
    );
}

export default ProfileSidebar;
