import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Companies() {
    const initstate = {
        companyname: "",
        nit: "",
        phone: "",
        department: "",
        city: "",
        address: "",
    };
    const history = useHistory();

    const [company, setCompany] = useState(initstate);
    const [data, setData] = useState({});
    const { companyname, nit, phone, address, department, city } = company;

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
            update(ref(database, `users/empresas/${id}`), company);
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
            remove(ref(database, `users/empresas/${id}`));
            toast.success("Empresa eliminada correctamente");
        } else {
            toast.error("Empresa no eliminada");
        }
    };

    useEffect(() => {
        const starCountRef = ref(database, `users/empresas`);
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

    return (
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
                        <h4 className="card-title">Empresas aliadas</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE DE LA EMPRESA</th>
                                        <th>NIT</th>
                                        <th>TELEFONO</th>
                                        <th>UBICACION</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        Object.keys(data || {}).map((id, key) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{key + 1}</td>
                                                    <td>{data[id].companyname}</td>
                                                    <td>{data[id].nit}</td>
                                                    <td>{data[id].phone}</td>
                                                    <td>{data[id].address}</td>

                                                    <td>
                                                        <Link to={`/allied-companies/companies/${id}`}>
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
                                                            onClick={() => handleDelete(id)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <Link to={`/allied-companies/moreinfo/${id}`}>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-success btn-sm"
                                                            >
                                                                Mas info
                                                            </button>
                                                        </Link>
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
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={address || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>TIPO DE CUENTA</Form.Label>
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
                            <Form.Label>NUMERO DE CUENTA</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="address"
                                name="address"
                                onChange={handleChange}
                                value={address || ""}
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
    );
}

export default Companies;
