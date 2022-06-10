import React, { Component } from 'react';
// import { Trans } from 'react-i18next';
class Companies extends Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">Lista De Empresas</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Lista</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Empresas</li>
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
                                            <th>NOMBRE DE LA EMPRESA</th>
                                            <th>NIT</th>
                                            <th>TELEFONO</th>
                                            <th>UBICACION</th>
                                            <th>ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>53275531</td>
                                            <td>12 May 2017</td>
                                            <td>Colombia</td>
                                            <td> <button className="btn btn-primary btn-sm">Editar</button> <button className="btn btn-danger btn-sm">Eliminar</button></td>
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
}

export default Companies;