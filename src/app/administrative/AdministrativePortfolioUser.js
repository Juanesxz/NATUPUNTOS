import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { database } from "../Firebase";
import { useAuth } from "../../context/authContext";
// import { Trans } from 'react-i18next';
function AdministrativePortfolioUser() {
    const { user } = useAuth();

    const [data, setData] = useState({});
    const [search, setSearch] = useState("");

    const { id } = useParams();

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
                dato.companyname.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.nit.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.phone.toLowerCase().includes(search.toLocaleLowerCase()) ||
                dato.address.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    return (
        <div>
            {user.role !== "null" && user.readadministrativeportfolio === "true" ? (
                <div>
                    <div className="page-header">
                        <h3 className="page-title">Cartera Administrativa</h3>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="!#" onClick={(event) => event.preventDefault()}>
                                        Lista
                                    </a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Cartera
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <nav style={{ left: 0 }} className="navbar p-0 d-flex flex-row">
                                    <h4 className="card-title">Carteras De Empresas</h4>
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
                                    <table className="table table-secondary  table-bordered">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NOMBRE DE LA EMPRESA</th>
                                                <th>NIT</th>
                                                <th>TOTAL PUNTOS</th>
                                                <th>TOTAL A PAGAR</th>
                                                <th>SUBIR SOPORTE</th>
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
                                                            <td>
                                                                {results[id].totalpoints
                                                                    ? results[id].totalpoints
                                                                    : 0}
                                                            </td>
                                                            <td>{results[id].points}</td>
                                                            {/* icon java */}
                                                            {user.administrativepaymentmethod === "true" ? (
                                                                <td>
                                                                    <Link
                                                                        to={`/administrative/upload-support/${results[id].id}`}
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-success btn-sm"
                                                                        >
                                                                            Subir Soporte de Pago
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            ) : (
                                                                <td></td>
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
                    <h1>NO TIENES LOS PERMISOS NECESARIOS PARA VER ESTE MODULO</h1>
                </div>
            )}
        </div>
    );
}

export default AdministrativePortfolioUser;
