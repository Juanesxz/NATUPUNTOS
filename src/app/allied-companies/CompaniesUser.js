import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../../context/authContext";

function CompaniesUser() {
    const { user } = useAuth();
    const initstate = {
        companyname: "",
        nit: "",
        phone: "",
        department: "",
        city: "",
        address: "",
        paymentmethod: "",
        accounttype: "",
        accountnumber: "",
        latitude: "",
        length: "",
    };
    const history = useHistory();

    const [company, setCompany] = useState(initstate);
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");
    const {
        companyname,
        nit,
        phone,
        address,
        department,
        city,
        paymentmethod,
        accounttype,
        accountnumber,
        latitude,
        length,
    } = company;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            companyname === "" ||
            nit === "" ||
            phone === "" ||
            address === "" ||
            department === "" ||
            city === ""
        ) {
            toast.error("Todos los campos son obligatorios");
        } else {
            update(ref(database, `empresas/${id}`), company);
            handleClose();
            toast.success("Empresa actualizada correctamente");
            history.push("/allied-companies/companies/list");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
    };

    const { id } = useParams();

    const handleDelete = (id) => {
        if (window.confirm("¿Estas seguro de eliminar este registro?")) {
            remove(ref(database, `empresas/${id}`));
            toast.success("Empresa eliminada correctamente");
        } else {
            toast.error("Empresa no eliminada");
        }
    };

    useEffect(() => {
        const starCountRef = ref(database, `empresas`);
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

    useEffect(() => {
        if (id) {
            setCompany({ ...data[id] });
        } else {
            setCompany({ ...initstate });
        }
        return () => {
            setCompany({ ...initstate });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, data]);

    const searcher = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        console.log(e.target.value);
    };

    const nombre = Object.keys(data).map((item, i) => data[item]);

    // metodo de filtrado 1
    let results = [];

    if (!search) {
        results = nombre;
    } else {
        results = nombre.filter(
            (dato) =>
                dato.companyname.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.nit.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.phone.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.address.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    console.log(company);

    return (
        <div>
            {user.role !== "null" && user.readalliedcompanies === "true" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Lista De Empresas</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Lista
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Empresas
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                                    <h4 className="card-title">Empresas Aliadas</h4>
                                    <ul className="navbar-nav w-20">
                                        <li className="nav-item w-20">
                                            <form className="nav-link mt-2 mt-md-0 d-lg-flex search">
                                                {data && (
                                                    <input
                                                        value={search}
                                                        onChange={searcher}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Buscar"
                                                        name="search"
                                                        id="search"
                                                    />
                                                )}
                                            </form>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NOMBRE DE LA EMPRESA</th>
                                                <th>NIT</th>
                                                <th>TELEFONO</th>
                                                <th>UBICACION</th>
                                                {user.editcompanies === "false" &&
                                                    user.deletecompanies === "false" &&
                                                    user.moreinfocompanies === "false" ? (
                                                    <th></th>
                                                ) : (
                                                    <th>ACCIONES</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {results &&
                                                Object.keys(results || {}).map((id, key) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{key + 1}</td>
                                                            <td>{results[id].companyname}</td>
                                                            <td>{results[id].nit}</td>
                                                            <td>{results[id].phone}</td>
                                                            <td>{results[id].address}</td>
                                                            <td>
                                                                {user.editcompanies === "true" ? (
                                                                    <Link
                                                                        to={`/allied-companies/companies/${results[id].id}`}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-primary btn-sm"
                                                                            onClick={handleShow}
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                    </Link>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                                {user.deletecompanies === "true" ? (
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        onClick={() => handleDelete(results[id].id)}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                                {user.moreinfocompanies === "true" ? (
                                                                    <Link
                                                                        to={`/allied-companies/moreinfo/${results[id].id}`}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-success btn-sm"
                                                                        >
                                                                            Mas info
                                                                        </button>
                                                                    </Link>
                                                                ) : (
                                                                    <div></div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>NOMBRE DE LA EMPRESA</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="companyname"
                                        name="companyname"
                                        onChange={handleChange}
                                        autoFocus
                                        value={companyname || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>NIT</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="nit"
                                        name="nit"
                                        onChange={handleChange}
                                        value={nit || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>TELEFONO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="phone"
                                        name="phone"
                                        onChange={handleChange}
                                        value={phone || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>DEPARTAMENTO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="department"
                                        name="department"
                                        onChange={handleChange}
                                        value={department || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>CIUDAD</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="city"
                                        name="city"
                                        onChange={handleChange}
                                        value={city || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>DIRECCION</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="address"
                                        name="address"
                                        onChange={handleChange}
                                        value={address || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>FORMA DE PAGO</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="paymentmethod"
                                        name="paymentmethod"
                                        onChange={handleChange}
                                        value={paymentmethod || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>TIPO DE CUENTA</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="accounttype"
                                        name="accounttype"
                                        onChange={handleChange}
                                        value={accounttype || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>NUMERO DE CUENTA</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder=""
                                        id="accountnumber"
                                        name="accountnumber"
                                        onChange={handleChange}
                                        value={accountnumber || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="latitude"
                                        name="latitude"
                                        onChange={handleChange}
                                        value={latitude || ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder=""
                                        id="length"
                                        name="length"
                                        onChange={handleChange}
                                        value={length || ""}
                                    />
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
            ) : (
                <div className="text-center">
                    <h1>NO TIENES LOS PERMISOS NECESARIOS PARA VER ESTE MODULO</h1>
                </div>
            )}
        </div>
    );
}

export default CompaniesUser;
