import React, { useState, useEffect } from "react";
import { database, adminnewpassword } from "../Firebase";
import { Form } from "react-bootstrap";
import { ref, onValue, update } from "firebase/database";
import { useAuth } from "../../context/authContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ChangePassword() {
    const [admin, setAdmin] = useState({
        oldpassword: "",
        newpassword: "",
        repeatnewpassword: "",
    });
    const [data, setData] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const { user } = useAuth();



    const handleChange = ({ target: { name, value } }) => {
        setAdmin({ ...admin, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            admin.oldpassword === "" ||
            admin.newpassword === "" ||
            admin.repeatnewpassword === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (data.password !== admin.oldpassword) {
                toast.error("La contraseña actual es incorrecta");
            } else {
                if (admin.newpassword !== admin.repeatnewpassword) {
                    toast.error("Las contraseñas no coinciden");
                } else {

                    try {
                        await adminnewpassword(admin.newpassword)
                        await update(ref(database, `admin/${id}`), {
                            password: admin.newpassword,
                        });
                        toast.success("La contraseña a sido cambiado de forma exitosa");
                        history.push("/Dashboard");
                    } catch (e) {
                        toast.error("a ocurrido un error" + e);
                    }
                }
            }
        }
    };

    useEffect(() => {
        const starCountRef = ref(database, `admin/${id}`);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setData({ ...data });
            } else {
                setData({});
            }
        });
        return () => {
            setData({});
        };
    }, [id]);

    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Cambio de contraseña</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Configuracion
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Cambio de contraseña
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 mx-auto  grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">CAMBIAR CONTRASEÑA</h4>

                                <form onSubmit={handleSubmit} className="forms-sample">
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="oldpassword"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Contraseña actual
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                id="oldpassword"
                                                name="oldpassword"
                                                placeholder="Contraseña actual"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="newpassword"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Contraseña nueva
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                id="newpassword"
                                                name="newpassword"
                                                placeholder="Contraseña nueva"
                                                onChange={handleChange}
                                                value={user.password}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="repeatnewpassword"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Repetir contraseña nueva
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="password"
                                                className="form-control"
                                                id="repeatnewpassword"
                                                name="repeatnewpassword"
                                                placeholder="Repita la nueva contraseña"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <button type="submit" className="btn btn-outline-success mr-2">
                                        Cambiar Contraseña
                                    </button>

                                    <Link to="/Dashboard" className="btn btn-outline-warning">
                                        Cancelar
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1>NO TIENES LOS PERMISOS NECESARIOS PARA VER ESTE MODULO</h1>
                </div>
            )}
        </div>
    );
}

export default ChangePassword;
