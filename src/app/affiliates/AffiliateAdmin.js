import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
function AffiliateAdmin() {
    //date format
    const initstate = {
        name: "",
        code: "",
        phone: "",
        municipio: "",
        departamento: "",
        points: "",
        morepoints: "0",
    };

    const [state, setState] = useState(initstate);
    const [data, setData] = useState({});
    const [mpoints, setMpoints] = useState({});
    const [search, setSearch] = useState("");
    const {
        name = "",
        code,
        phone,
        points = 0,
        morepoints = 0,
        municipio,
        departamento,
        totalpoints = 0,
    } = state;



    //form modal submit
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //form modal submit points
    const [showPoints, setShowPoints] = useState(false);
    const handleClosePoints = () => setShowPoints(false);
    const handleShowPoints = () => setShowPoints(true);

    const history = useHistory();

    // Button para actualizar afiliados
    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            code === "" ||
            phone === "" ||
            municipio === "" ||
            departamento === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            update(ref(database, `users/${id}`), state);
            toast.success("Afiliado actualizado");
            handleClose();
            history.push("/affiliates/affiliate/list");
        }
    };


    // Button para agregar puntos
    const handleSubmitPoints = (e) => {
        e.preventDefault();
        const newPoints = parseInt(points) + parseInt(morepoints);
        if (isNaN(newPoints)) {
            toast.error("Por favor ingrese un numero");
        } else {
            update(ref(database, `users/${id}`), {
                points: newPoints,
                totalpoints: parseInt(morepoints) + parseInt(totalpoints),
            });
            toast.success("Puntos actualizados");
            handleClosePoints();
            history.push("/affiliates/affiliate/list");
        }
        const puntosmunicipio = isNaN(mpoints[state.municipio]?.points) ? parseInt(morepoints) : mpoints[state.municipio]?.points + parseInt(morepoints);
        update(ref(database, `townshippoints/${state.municipio}`), {
            municipio: state.municipio,
            points: puntosmunicipio,
        });
    };
    // obtener el valor del input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { id } = useParams();

    //button para eliminar afiliado
    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro de eliminar este afiliado?")) {
            remove(ref(database, `users/${id}`));
            toast.success("Afiliado eliminado");
        } else {
            toast.error("No se eliminó el afiliado");
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const starCountRef = ref(database, `users`);
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

    //data de puntos municipios
    useEffect(() => {
        const starCountRef = ref(database, `townshippoints`);
        onValue(starCountRef, (snapshot) => {
            const mpoints = snapshot.val();
            if (mpoints !== null) {
                setMpoints({ ...mpoints });
            } else {
                setMpoints({});
            }
        });
        return () => {
            setMpoints({});
        };
    }, []);




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
                dato.code.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.phone.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.municipio.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.departamento.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }



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
                        <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                            <h4 className="card-title">Afiliados</h4>
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
                                        <th>CODIGO ASIGNADO</th>
                                        <th>TELEFONO</th>
                                        <th>CIUDAD</th>
                                        <th>PUNTOS</th>
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
                                                    <td> {results[id].code} </td>
                                                    <td> {results[id].phone} </td>
                                                    <td> {results[id].municipio} </td>
                                                    <td> {results[id].points || 0} </td>
                                                    <td>
                                                        <Link
                                                            to={`/affiliates/affiliate/${results[id].id}`}
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
                                                            onClick={() => handleDelete(results[id].id)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <Link
                                                            to={`/affiliates/affiliate/${results[id].id}`}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-success btn-sm"
                                                                onClick={handleShowPoints}
                                                            >
                                                                Cambiar puntos
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

            {/* MODAL DE EDITAR */}
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
                                disabled
                                type="text"
                                placeholder=""
                                id="code"
                                name="code"
                                onChange={handleInputChange}
                                value={code || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>TELEFONO</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=""
                                id="phone"
                                name="phone"
                                onChange={handleInputChange}
                                value={phone || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>DEPARTAMENTO</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="departamento"
                                name="departamento"
                                onChange={handleInputChange}
                                value={departamento || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>CIUDAD</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                id="municipio"
                                name="municipio"
                                onChange={handleInputChange}
                                value={municipio || ""}
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

            {/* MODAL AGREGAR */}
            <Modal show={showPoints} onHide={handleClosePoints}>
                <Modal.Header closeButton>
                    <Modal.Title>AGREGAR PUNTOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPoints}>
                        <Form.Group className="mb-3">
                            <Form.Label>PUNTOS ACTUALES</Form.Label>
                            <Form.Control
                                type="number"
                                id="points"
                                name="points"
                                disabled
                                value={points || 0}
                                style={{ backgroundColor: "#2A3038", textAlign: "center" }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>AÑADIR PUNTOS</Form.Label>
                            <Form.Control
                                type="number"
                                id="morepoints"
                                name="morepoints"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="outline-warning" onClick={handleClosePoints}>
                                CANCELAR
                            </Button>
                            <Button type="submit" variant="outline-success">
                                AGREGAR PUNTOS
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AffiliateAdmin;
