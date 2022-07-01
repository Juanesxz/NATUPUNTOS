import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { push, ref, set } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";

function CreateProfile() {
    const [user, setUser] = useState({
        name: "",
        password: "",
        email: "",
        role: "",
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { signup, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const history = useHistory();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            user.name === "" ||
            user.password === "" ||
            user.email === "" ||
            user.role === "" ||
            user.role === "Seleccione rol"
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            try {
                const infoUsuario = await signup(user.email, user.password, user.role);
                console.log(infoUsuario);
                await set(ref(database, "admin/" + infoUsuario.user.uid), {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
                toast.success("El Nuevo Perfil De usuario se ha registrado correctamente");
                handleLogout();
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    toast.error("El correo ya está en uso");
                }
                if (error.code === "auth/invalid-email") {
                    toast.error("El correo no es válido");
                }
                if (error.code === "auth/weak-password") {
                    toast.error("La contraseña debe tener al menos 6 caracteres");
                }
                if (error.code === "auth/operation-not-allowed") {
                    toast.error("La cuenta no está habilitada");
                }
            }
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center auth px-0 h-100">
                <div className="row w-100 mx-0">
                    <div className="col-lg-7 mx-auto">
                        <div className="card text-center py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                <img
                                    src={require("../../assets/images/logo1.png")}
                                    alt="logo"
                                />
                            </div>
                            <h4>REGISTRAR UN NUEVO PERFIL</h4>

                            <form onSubmit={handleSubmit} className="pt-3">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="name"
                                        name="name"
                                        placeholder="Nombre"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        placeholder="Correo electronico"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        id="role"
                                        name="role"
                                        onChange={handleChange}
                                    >
                                        <option>Seleccione rol</option>
                                        <option>ADMINISTRADOR</option>
                                        <option>SECRETARIA</option>
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                                        type="submit"
                                    >
                                        INSCRIBIRSE
                                    </button>
                                </div>
                                <div className="bntext-center mt-4 font-weight-light">

                                    <Link to="/dashboard" className="btn btn-outline-danger ">
                                        volver
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProfile