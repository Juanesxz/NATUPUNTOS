import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Affiliate() {
    const initstate = {
        name: "",
        assignedcode: "",
        phone: "",
        address: "",
        points: "",
    };

    const history = useHistory();

    const [state, setState] = useState(initstate);
    const [data, setData] = useState({});
    const { name, assignedcode, phone, address, points } = state;


    //form modal submit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //form modal submit points
    const [showPoints, setShowPoints] = useState(false);
    const handleClosePoints = () => setShowPoints(false);
    const handleShowPoints = () => setShowPoints(true);




    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "" || assignedcode === "" || phone === "" || address === "") {
            toast.error("Debe llenar todos los campos");
        } else {
            update(ref(database, `users/afiliados/${id}`), state);
            toast.success("Afiliado actualizado");
            handleClose();
            history.push("/affiliates/affiliate/list");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { id } = useParams();

    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro de eliminar este afiliado?")) {
            remove(ref(database, `users/afiliados/${id}`));
            toast.success("Afiliado eliminado");
        } else {
            toast.error("No se eliminó el afiliado");
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const starCountRef = ref(database, `users/afiliados`);
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

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Lista De Afiliados</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                Lista
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Afiliados
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Afiliados</h4>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                        <th>CODIGO ASIGNADO</th>
                                        <th>TELEFONO</th>
                                        <th>DIRECCION</th>
                                        <th>PUNTOS</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        Object.keys(data || {}).map((id, key) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{key + 1}</td>
                                                    <td> {data[id].name} </td>
                                                    <td> {data[id].assignedcode} </td>
                                                    <td> {data[id].phone} </td>
                                                    <td> {data[id].address} </td>
                                                    <td> {data[id].points} </td>
                                                    <td>
                                                        <Link to={`/affiliates/affiliate/${id}`}>
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
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-success btn-sm"
                                                            onClick={handleShowPoints}
                                                        >
                                                            Agregar Puntos
                                                        </button>
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
                            <Form.Label>NOMBRE</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                                autoFocus
                                value={name || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CODIGO ASIGNADO</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="assignedcode"
                                name="assignedcode"
                                onChange={handleInputChange}
                                value={assignedcode || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>TELEFONO</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="phone"
                                name="phone"
                                onChange={handleInputChange}
                                value={phone || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>DIRECCION</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="address"
                                name="address"
                                onChange={handleInputChange}
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




            <Modal show={showPoints} onHide={handleClosePoints}>
                <Modal.Header closeButton>
                    <Modal.Title>AGREGAR PUNTOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>PUNTOS ACTUALES</Form.Label>
                            <Form.Control
                                type="number"
                                id="points"
                                name="points"
                                disabled
                                value={points || ""}
                                style={{ backgroundColor: "#2A3038", textAlign: "center" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>AÑADIR PUNTOS</Form.Label>
                            <Form.Control
                                type="number"
                                id="morepoints"
                                name="morepoints"
                            />
                        </Form.Group>




                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-warning" onClick={handleClosePoints}>
                        CANCELAR
                    </Button>
                    <Button variant="outline-success" onClick={handleClosePoints}>
                        AGREGAR PUNTOS
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
}

export default Affiliate;
