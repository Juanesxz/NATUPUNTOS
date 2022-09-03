import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase";

function ReportPointsByCityUser() {
    const [mpoints, setMpoints] = useState({});
    const [search, setSearch] = useState("");

    const searcher = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    const points = Object.keys(mpoints).map((key) => {
        return mpoints[key];
    });

    let results = [];

    if (!search) {
        results = points;
    } else {
        results = points.filter((dato) =>
            dato.municipio.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    const { user } = useAuth();
    return (
        <div>
            {user.role !== "null" && user.readreportspointsbycity === "true" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Puntos Por Ciudad</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Reporte
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Ciudad
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                                    <h4 className="card-title">Puntos Ciudad</h4>
                                    <ul className="navbar-nav w-20">
                                        <li className="nav-item w-20">
                                            {mpoints && (
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
                                                <th>NOMBRE CIUDAD</th>
                                                <th>TOTAL PUNTOS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(results).map((key, id) => (
                                                <tr key={key}>
                                                    <td>{id + 1}</td>
                                                    <td>{results[key].municipio}</td>
                                                    <td>
                                                        {results[key].points ? results[key].points : 0}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

export default ReportPointsByCityUser;
