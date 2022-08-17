import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase";
import moment from "moment";

function HistoryTable() {
    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { id } = useParams();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const starCountRef = ref(database, `transfer`);
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
                dato.clientName.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.points.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.empresaName.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.clientId.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.empresaId.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.date.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">TABLA DE HISTORIAL GENERAL</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                Lista
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            General
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                            <h4 className="card-title">Historial general</h4>
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
                                        <th>ID CLIENTE</th>
                                        <th>NOMBRE CLIENTE</th>
                                        <th>FECHA DE TRANSACCION</th>
                                        <th>HORA</th>
                                        <th>ID EMPRESA</th>
                                        <th>NOMBRE EMPRESA</th>
                                        <th>PUNTOS</th>
                                        <th>ESTATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results &&
                                        Object.keys(results || {}).map((id, key) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{key + 1}</td>
                                                    <td>{results[id].clientId}</td>
                                                    <td>{results[id].clientName}</td>
                                                    <td>
                                                        {" "}
                                                        {`${moment(results[id].date).format(
                                                            "YYYY"
                                                        )}-${moment(results[id].date).format(
                                                            "MM"
                                                        )}-${moment(results[id].date).format("DD")}`}
                                                    </td>
                                                    <td>
                                                        {" "}
                                                        {`${moment(results[id].date).format("h")}:${moment(
                                                            results[id].date
                                                        ).format("mm")}:${moment(results[id].date).format(
                                                            "ss"
                                                        )} ${moment(results[id].date).format("A")}`}
                                                    </td>
                                                    <td>{results[id].empresaId}</td>
                                                    <td>{results[id].empresaName}</td>
                                                    <td>{results[id].points}</td>
                                                    <td>
                                                        {results[id].status ? "ACEPTADA" : "RECHAZADA"}
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

export default HistoryTable;
