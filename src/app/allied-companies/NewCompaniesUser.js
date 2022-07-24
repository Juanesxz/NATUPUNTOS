import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { Link, useHistory } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database, uploadFile } from "../Firebase";
import { toast } from "react-toastify";
import { departamentos } from "../../components/Department";

function NewCompaniesUser() {
    const [users, setUsers] = useState({
        companyname: "",
        nit: "",
        phone: "",
        email: "",
        iddepartaments: -1,
        department: "",
        city: "",
        address: "",
        latitude: "",
        length: "",
        id: "",
        photo: null,
        totalpoints: 0,
    });

    console.log(users);

    const nombredepartamentos = departamentos.map((item, i) => item.nombre);

    const departaments = nombredepartamentos[users.iddepartaments];

    if (departaments === undefined) {
        users.department = "";
    } else {
        users.department = departaments;
    }

    const { signup, user } = useAuth();
    const history = useHistory();

    const handleChange = ({ target: { name, value } }) => {
        setUsers({ ...users, [name]: value });
    };

    const handlePhoto = ({ target: { files } }) => {
        setUsers({ ...users, photo: files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            users.companyname === "" ||
            users.nit === "" ||
            users.phone === "" ||
            users.email === "" ||
            users.department === "" ||
            users.city === "" ||
            users.address === "" ||
            users.latitude === "" ||
            users.length === "" ||
            users.photo === null
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (
                users.photo.type === "image/jpeg" ||
                users.photo.type === "image/png"
            ) {
                try {
                    const infoEmpresa = await signup(users.email, users.nit);
                    const infofoto = await uploadFile(user.photo, infoEmpresa.user.uid);
                    await set(ref(database, "empresas/" + infoEmpresa.user.uid), {
                        companyname: users.companyname,
                        nit: users.nit,
                        phone: users.phone,
                        email: users.email,
                        department: users.department,
                        city: users.city,
                        address: users.address,
                        latitude: users.latitude,
                        length: users.length,
                        id: infoEmpresa.user.uid,
                        imgpath: infofoto,
                        totalpoints: user.totalpoints,
                    });

                    history.push("/allied-companies/companies/list");
                    toast.success("Registro de empresa exitoso");
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
            } else {
                toast.error("La imagen debe ser formato jpeg o png");
            }
        }
    };

    return (
        <div>
            {user.role !== "null" && user.readregisternewcompanies === "true" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Registrar Empresa</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Lista
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Nueva Empresa
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 mx-auto  grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">REGISTRAR NUEVA EMPRESA</h4>

                                <form onSubmit={handleSubmit} className="forms-sample">
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="companyname"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Nombre De La Empresa
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="companyname"
                                                name="companyname"
                                                placeholder="Nombre"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="nit" className="col-sm-3 col-form-label">
                                            NIT
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="nit"
                                                name="nit"
                                                placeholder="NIT"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">
                                            Telefono
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                placeholder="Telefono"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">
                                            Correo
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Correo"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">
                                            Departamento
                                        </label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="iddepartaments"
                                                id="iddepartaments"
                                                onChange={handleChange}
                                            >
                                                <option value="-1">Seleccione un departamento</option>
                                                {departamentos.map((item, i) => (
                                                    <option
                                                        key={"iddepartaments" + i}
                                                        name={item.nombre}
                                                        id={item.nombre}
                                                        value={i}
                                                    >
                                                        {item.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Ciudad</label>
                                        <div className="col-sm-9">
                                            <select
                                                className="form-control"
                                                name="city"
                                                id="city"
                                                onChange={handleChange}
                                            >
                                                <option value="">Seleccione una ciudad</option>

                                                {users.iddepartaments > -1 &&
                                                    departamentos[users.iddepartaments].municipios.map(
                                                        (item, i) => (
                                                            <option key={"ciudad" + i} value={item.ciudad}>
                                                                {item}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="address"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Direccion
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="address"
                                                name="address"
                                                placeholder="Direccion"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="photo" className="col-sm-3 col-form-label">
                                            Logo de la Empresa
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="file"
                                                className="form-control"
                                                id="photo"
                                                name="photo"
                                                placeholder="Foto"
                                                onChange={handlePhoto}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label
                                            htmlFor="latitude"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Latitud
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="latitude"
                                                name="latitude"
                                                placeholder="Latitud"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="length" className="col-sm-3 col-form-label">
                                            Longitud
                                        </label>
                                        <div className="col-sm-9">
                                            <Form.Control
                                                type="text"
                                                className="form-control"
                                                id="length"
                                                name="length"
                                                placeholder="Longitud"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form.Group>

                                    <button
                                        type="submit"
                                        className="btn btn-outline-success mr-2"
                                    >
                                        Registrar
                                    </button>

                                    <Link
                                        to="/allied-companies/companies/list"
                                        className="btn btn-outline-warning"
                                    >
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

export default NewCompaniesUser;
