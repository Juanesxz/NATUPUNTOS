/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { useAuth } from "../../context/authContext";

function ListProfile() {
    const initstate = {
        email: "",
        name: "",
        role: "",
        readafiliados: "",
        editafiliados: "",
        deleteafiliados: "",
        changepoints: "",
        readregisternewcompanies: "",
        readalliedcompanies: "",
        editcompanies: "",
        deletecompanies: "",
        moreinfocompanies: "",
        readadministrativeportfolio: "",
        administrativepaymentmethod: "",
        readstatisticspointspermonth: "",
        readcompaniespointsstatistics: "",
        readreportspointspercustomer: "",
        readreportspointsbycompanies: "",
        readreportspointsbycity: "",
        readoverallhistory: "",
        readhistorytable: "",
    };
    const history = useHistory();

    //form modal submit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState(initstate);
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    const { id } = useParams();

    const {
        name,
        email,
        role,
        readafiliados,
        editafiliados,
        deleteafiliados,
        changepoints,
        readregisternewcompanies,
        readalliedcompanies,
        editcompanies,
        deletecompanies,
        moreinfocompanies,
        readadministrativeportfolio,
        administrativepaymentmethod,
        readstatisticspointspermonth,
        readcompaniespointsstatistics,
        readreportspointspercustomer,
        readreportspointsbycompanies,
        readreportspointsbycity,
        readoverallhistory,
        readhistorytable,
    } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            readafiliados === "" ||
            editafiliados === "" ||
            deleteafiliados === "" ||
            changepoints === "" ||
            readregisternewcompanies === "" ||
            readalliedcompanies === "" ||
            editcompanies === "" ||
            deletecompanies === "" ||
            moreinfocompanies === "" ||
            readadministrativeportfolio === "" ||
            administrativepaymentmethod === "" ||
            readstatisticspointspermonth === "" ||
            readcompaniespointsstatistics === "" ||
            readreportspointspercustomer === "" ||
            readreportspointsbycompanies === "" ||
            readreportspointsbycity === "" ||
            readoverallhistory === "" ||
            readhistorytable === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (state.role === "ADMINISTRADOR") {
                toast.error(
                    "No se puede cambiar los permisos de los usuarios administrador"
                );
            } else {
                update(ref(database, `admin/${id}`), state);
                toast.success("Afiliado actualizado");
                handleClose();
                history.push("/setting/listprofile/list");
            }
        }
    };

    // obtener el valor del input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleDelete = (id, role) => {
        if (role === "ADMINISTRADOR") {
            toast.error("No se puede eliminar los usuarios administrador");
        } else {
            if (window.confirm("¿Está seguro de eliminar este afiliado?")) {
                remove(ref(database, `admin/${id}`));
                toast.success("Afiliado eliminado");
            } else {
                toast.error("No se eliminó el afiliado");
            }
        }
    };

    useEffect(() => {
        const starCountRef = ref(database, `admin`);
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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (id) {
            setState({ ...data[id] });
        } else {
            setState({ ...initstate });
        }
        return () => {
            setState({ ...initstate });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, data]);

    const searcher = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const nombre = Object.keys(data).map((item, i) => data[item]);

    // metodo de filtrado 1
    let results = [];

    if (!search) {
        results = nombre;
    } else {
        results = nombre.filter(
            (dato) =>
                dato.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.email.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    const { user } = useAuth();
    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Lista De Perfiles</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Lista
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Perfiles
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                                    <h4 className="card-title">Perfiles</h4>
                                    <ul className="navbar-nav w-20">
                                        <li className="nav-item w-20">
                                            {data && (
                                                <input
                                                    value={search}
                                                    onChange={searcher}
                                                    type="search"
                                                    placeholder="Buscar"
                                                    className="form-control "
                                                />
                                            )}
                                        </li>
                                    </ul>
                                </nav>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NOMBRE</th>
                                                <th>EMAIL</th>
                                                <th>ROL</th>
                                                <th>ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results &&
                                                Object.keys(results || {}).map((id, key) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{key + 1}</td>
                                                            <td> {results[id].name} </td>
                                                            <td> {results[id].email} </td>
                                                            <td> {results[id].role} </td>
                                                            {user.role === "ADMINISTRADOR" ? (
                                                                <td>
                                                                    <Link
                                                                        to={`/setting/listprofile/${results[id].id}`}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-primary btn-sm"
                                                                            onClick={handleShow}
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                    </Link>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        onClick={() =>
                                                                            handleDelete(
                                                                                results[id].id,
                                                                                results[id].role
                                                                            )
                                                                        }
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </td>
                                                            ) : (
                                                                <td> </td>
                                                            )}
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
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

            {/* MODAL DE EDITAR */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                placeholder={state.name}
                                disabled={true}
                                style={{ backgroundColor: "#2A3038", textAlign: "center" }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="email"
                                name="email"
                                onChange={handleInputChange}
                                placeholder={state.email}
                                disabled={true}
                                style={{ backgroundColor: "#2A3038", textAlign: "center" }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="role"
                                name="role"
                                onChange={handleInputChange}
                                placeholder={state.role}
                                disabled={true}
                                style={{ backgroundColor: "#2A3038", textAlign: "center" }}
                            />
                        </div>
                        <p className="card-description"> PERMISOS MODULOS AFILIADOS </p>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">Ver afiliados</label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readafiliados"
                                    className="form-control"
                                    value={readafiliados || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Editar afiliados
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="editafiliados"
                                    className="form-control"
                                    value={editafiliados || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Eliminar afiliados
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="deleteafiliados"
                                    className="form-control"
                                    value={deleteafiliados || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Cambiar puntos afiliados
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="changepoints"
                                    className="form-control"
                                    value={changepoints || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <p className="card-description"> PERMISOS MODULOS EMPRESAS </p>

                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Crear nuevas empresas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readregisternewcompanies"
                                    className="form-control"
                                    value={readregisternewcompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver empresas aliadas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readalliedcompanies"
                                    className="form-control"
                                    value={readalliedcompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Editar empresas aliadas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="editcompanies"
                                    className="form-control"
                                    value={editcompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Eliminar empresas aliadas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="deletecompanies"
                                    className="form-control"
                                    value={deletecompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">Mas info</label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="moreinfocompanies"
                                    className="form-control"
                                    value={moreinfocompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>

                        <p className="card-description">
                            {" "}
                            PERMISOS MODULOS ADMINISTRATIVO{" "}
                        </p>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver cartera administrativa
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readadministrativeportfolio"
                                    className="form-control"
                                    value={readadministrativeportfolio || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Forma de pago administrativo
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="administrativepaymentmethod"
                                    className="form-control"
                                    value={administrativepaymentmethod || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <p className="card-description"> PERMISOS MODULOS ESTADISTICAS </p>

                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver estadisticas puntos por mes
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readstatisticspointspermonth"
                                    className="form-control"
                                    value={readstatisticspointspermonth || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver estadisticas puntos de empresas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readcompaniespointsstatistics"
                                    className="form-control"
                                    value={readcompaniespointsstatistics || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>

                        <p className="card-description"> PERMISOS MODULOS REPORTES </p>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver reportes puntos por clientes
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readreportspointspercustomer"
                                    className="form-control"
                                    value={readreportspointspercustomer || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>

                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver reportes puntos de empresas
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readreportspointsbycompanies"
                                    className="form-control"
                                    value={readreportspointsbycompanies || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver reportes puntos de ciudad
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readreportspointsbycity"
                                    className="form-control"
                                    value={readreportspointsbycity || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver historial general
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readoverallhistory"
                                    className="form-control"
                                    value={readoverallhistory || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className="row">
                            <label className="col-sm-3 col-form-label">
                                Ver tabla del historial general
                            </label>
                            <div className="col-sm-9">
                                <select
                                    onChange={handleInputChange}
                                    name="readhistorytable"
                                    className="form-control"
                                    value={readhistorytable || ""}
                                >
                                    <option>false</option>
                                    <option>true</option>
                                </select>
                            </div>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="outline-warning" onClick={handleClose}>
                                Cancelar
                            </Button>

                            <Button type="submit" variant="outline-success ">
                                guardar cambios
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ListProfile;
