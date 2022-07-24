import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase";

function ReportPointsForCustomersAdmin() {
    const { id } = useParams();

    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

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
                dato.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.code.toLowerCase().includes(search.toLocaleLowerCase())


        );
    }



    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Puntos Por Afiliado</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                Reporte
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Afiliado
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                            <h4 className="card-title">Puntos Afiliados</h4>
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
                            <table className="table table-secondary  table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE</th>
                                        <th>CODIGO ASIGNADO</th>
                                        <th>TOTAL PUNTOS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results &&
                                        Object.keys(results || {}).map((id, key) => {
                                            return (
                                                <tr key={id}>
                                                    <td>{key + 1}</td>
                                                    <td>{results[id].name}</td>
                                                    <td>{results[id].code}</td>
                                                    <td>
                                                        {results[id].totalpoints
                                                            ? results[id].totalpoints
                                                            : 0}
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

export default ReportPointsForCustomersAdmin;
