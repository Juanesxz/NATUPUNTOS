import React from 'react'
import { Dropdown } from "react-bootstrap";
import { useAuth } from '../context/authContext'


function Profile() {
    const { user, loading } = useAuth();
    if (loading) {
        return <h4>cargando...</h4>;
    }
    return (
        <div>
            <Dropdown.Toggle
                as="a"
                className="nav-link cursor-pointer no-caret"
            >
                <div className="navbar-profile">
                    <img
                        className="img-xs rounded-circle"
                        src={require("../assets/images/faces/face15.jpg")}
                        alt="profile"
                    />
                    <p className="mb-0 d-none d-sm-block navbar-profile-name">
                        {user.email}
                    </p>
                    <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
            </Dropdown.Toggle>
        </div>
    )
}

export default Profile