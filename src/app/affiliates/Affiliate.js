import React from "react";
import { useAuth } from "../../context/authContext";

// import { Trans } from 'react-i18next';
function Affiliate() {



    const authContext = useAuth()


    console.log(authContext);

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
                                        <th>NOMBRE</th>
                                        <th>DOCUMENTO</th>
                                        <th>TELEFONO</th>
                                        <th>UBICACION</th>
                                        <th>ACCIONES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jacob</td>
                                        <td>53275531</td>
                                        <td>302093209</td>
                                        <td>Colombia</td>
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
