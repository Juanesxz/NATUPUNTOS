import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database } from "../Firebase";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

function CreateProfile() {
    const [users, setUsers] = useState({
        name: "",
        password: "",
        email: "",
        role: "",
        readafiliados: "false",
        editafiliados: "false",
        deleteafiliados: "false",
        changepoints: "false",
        readregisternewcompanies: "false",
        readalliedcompanies: "false",
        editcompanies: "false",
        deletecompanies: "false",
        moreinfocompanies: "false",
        readadministrativeportfolio: "false",
        administrativepaymentmethod: "false",
        readstatisticspointspermonth: "false",
        readcompaniespointsstatistics: "false",
        readreportspointspercustomer: "false",
        readreportspointsbycompanies: "false",
        readreportspointsbycity: "false",
    });

    const history = useHistory();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { signup, user } = useAuth();

    // eslint-disable-next-line react-hooks/rules-of-hooks

    const handleChange = ({ target: { name, value } }) => {
        setUsers({ ...users, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            users.name === "" ||
            users.password === "" ||
            users.email === "" ||
            users.role === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (users.role === "ADMINISTRADOR") {
                toast.error("No puedes crear un perfil de administrador");
            } else {
                try {
                    const infoUsuario = await signup(users.email, users.password);
                    const refusers = ref(database, "admin/" + infoUsuario.user.uid);
                    await set(refusers, {
                        name: users.name,
                        email: users.email,
                        role: users.role,
                        readafiliados: users.readafiliados,
                        editafiliados: users.editafiliados,
                        deleteafiliados: users.deleteafiliados,
                        changepoints: users.changepoints,
                        readregisternewcompanies: users.readregisternewcompanies,
                        readalliedcompanies: users.readalliedcompanies,
                        editcompanies: users.editcompanies,
                        deletecompanies: users.deletecompanies,
                        moreinfocompanies: users.moreinfocompanies,
                        readadministrativeportfolio: users.readadministrativeportfolio,
                        administrativepaymentmethod: users.administrativepaymentmethod,
                        readstatisticspointspermonth: users.readstatisticspointspermonth,
                        readcompaniespointsstatistics: users.readcompaniespointsstatistics,
                        readreportspointspercustomer: users.readreportspointspercustomer,
                        readreportspointsbycompanies: users.readreportspointsbycompanies,
                        readreportspointsbycity: users.readreportspointsbycity,
                    });

                    toast.success("Usuario creado correctamente");
                    toast.success(
                        "El Nuevo Perfil De usuario se ha registrado correctamente"
                    );
                    history.push("/dashboard");
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
        }
    };

    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
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
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="role"
                                                name="role"
                                                placeholder="Rol de usuario"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {/* Permisos para afiliados */}
                                        <p className="card-description">
                                            {" "}
                                            PERMISOS MODULOS AFILIADOS{" "}
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver afiliados
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readafiliados"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Editar afiliados
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="editafiliados"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Eliminar afiliados
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="deleteafiliados"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Cambiar puntos afiliados
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="changepoints"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {/* Permisos para empresas */}
                                        <p className="card-description">
                                            {" "}
                                            PERMISOS MODULOS EMPRESAS{" "}
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Crear nuevas empresas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readregisternewcompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver empresas aliadas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readalliedcompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Editar empresas aliadas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="editcompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Eliminar empresas aliadas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="deletecompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Mas info
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="moreinfocompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {/* Permisos para administrativo */}
                                        <p className="card-description">
                                            {" "}
                                            PERMISOS MODULOS ADMINISTRATIVO{" "}
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver cartera administrativa
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readadministrativeportfolio"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Forma de pago administrativo
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="administrativepaymentmethod"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>
                                        {/* Permisos para estadisticas */}
                                        <p className="card-description">
                                            {" "}
                                            PERMISOS MODULOS ESTADISTICAS{" "}
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver estadisticas puntos por mes
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readstatisticspointspermonth"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver estadisticas puntos de empresas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readcompaniespointsstatistics"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        {/* Permisos para reportes */}
                                        <p className="card-description">
                                            {" "}
                                            PERMISOS MODULOS REPORTES{" "}
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver reportes puntos por clientes
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readreportspointspercustomer"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver reportes puntos de empresas
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readreportspointsbycompanies"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                            <div className="col-md-6">
                                                <Form.Group className="row">
                                                    <label className="col-sm-3 col-form-label">
                                                        Ver reportes puntos de ciudad
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select
                                                            onChange={handleChange}
                                                            name="readreportspointsbycity"
                                                            className="form-control"
                                                        >
                                                            <option>false</option>
                                                            <option>true</option>
                                                        </select>
                                                    </div>
                                                </Form.Group>
                                            </div>
                                        </div>

                                        {/* Boton de formulario */}
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
            ) : (
                <div className="text-center">
                    <h1>SOLO EL ADMINISTRADOR PUEDE VER ESTE MODULO</h1>
                    <div className="bntext-center mt-4 font-weight-light">
                        <Link to="/dashboard" className="btn btn-outline-danger ">
                            volver
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateProfile;
