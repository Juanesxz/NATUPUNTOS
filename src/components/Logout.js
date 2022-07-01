import React from "react";
import { Dropdown } from "react-bootstrap";
import { useAuth } from "../context/authContext";
function Logout() {
    const { logout } = useAuth();
    return (
        <div>
            <h6 className="p-3 mb-0">Perfil</h6>
            <Dropdown.Divider />
            <Dropdown.Item
                href="!#"
                onClick={(evt) => evt.preventDefault()}
                className="preview-item"
            >
                <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-settings text-success"></i>
                    </div>
                </div>
                <div className="preview-item-content">
                    <button className="btn btn-sm btn-block btn-outline-success">
                        {" "}
                        Configuracion{" "}
                    </button>
                </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
                href="!#"
                onClick={(evt) => evt.preventDefault()}
                className="preview-item"
            >
                <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                        <i className="mdi mdi-logout text-danger"></i>
                    </div>
                </div>
                <div className="preview-item-content">
                    <button className="btn btn-sm btn-block btn-outline-danger" onClick={logout}>
                        {" "}
                        Cerrar sesión{" "}
                    </button>
                </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <p className="p-3 mb-0 text-center">Configuraciones avanzadas</p>
        </div>
    );
}

export default Logout;
