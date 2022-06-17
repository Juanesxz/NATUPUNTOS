import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

import { ref, onValue, remove } from "firebase/database";
import { database } from "../Firebase";
import { toast } from "react-toastify";

function Affiliate() {
    const [data, setData] = useState();
    const { user, loading } = useAuth();

    if (loading) {
        return <h2>Loading...</h2>;
    }

    console.log(user);

    // eslint-disable-next-line react-hooks/rules-of-hooks

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        onValue(ref(database, "users/afiliados"), (snapshot) => {
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
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro de eliminar este afiliado?")) {
            remove(ref(database, `users/afiliados/${id}`));
            toast.success("Afiliado eliminado");
        }
    };

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
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                        >
                                                            Editar
                                                        </button>
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
        </div>
    );
}

export default Affiliate;
