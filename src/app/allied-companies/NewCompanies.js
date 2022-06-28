import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { push, ref } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";

function NewCompanies() {
    const [user, setUser] = useState({
        companyname: "",
        nit: "",
        phone: "",
        email: "",
        department: "",
        city: "",
        address: "",
    });

    const history = useHistory();

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            user.companyname === "" ||
            user.nit === "" ||
            user.phone === "" ||
            user.email === "" ||
            user.department === "" ||
            user.city === "" ||
            user.address === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            try {
                await push(ref(database, "users/empresas"), user);
                history.push("/allied-companies/companies/list");
                toast.success("Registro exitoso");
            } catch (error) {
                toast.error("Error al registrar la empresa");
            }
        }
    };

    return (
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
                                <label className="col-sm-3 col-form-label">Departamento</label>
                                <div className="col-sm-9">
                                    <select
                                        className="form-control"
                                        name="department"
                                        id="department"
                                        onChange={handleChange}
                                    >
                                        <option>America</option>
                                        <option>Italy</option>
                                        <option>Russia</option>
                                        <option>Britain</option>
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
                                        <option>America</option>
                                        <option>Italy</option>
                                        <option>Russia</option>
                                        <option>Britain</option>
                                    </select>
                                </div>
                            </Form.Group>
                            <Form.Group className="row">
                                <label htmlFor="address" className="col-sm-3 col-form-label">
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

                            <button type="submit" className="btn btn-outline-primary mr-2">
                                Registrar
                            </button>

                            <Link to="/dashboard" className="btn btn-outline-light">
                                Cancelar
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCompanies;
