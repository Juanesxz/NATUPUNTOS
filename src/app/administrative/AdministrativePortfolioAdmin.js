import React from "react";
// import { Trans } from 'react-i18next';
function AdministrativePortfolioAdmin() {
    return (
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
                        <h4 className="card-title">Carteras De Empresas</h4>
                        <div className="table-responsive">
                            <table className="table table-secondary  table-bordered">
                                <thead>
                                    <tr>
                                        <th>NOMBRE DE LA EMPRESA</th>
                                        <th>NIT</th>
                                        <th>TOTAL PUNTOS</th>
                                        <th>TOTAL A PAGAR</th>
                                        <th>FORMA DE PAGO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hola</td>
                                        <td>53275531</td>
                                        <td>120000</td>
                                        <td>8000</td>
                                        {/* icon java */}
                                        <td>
                                            <i className="mdi mdi-credit-card-outline" />
                                            {/* icon fire */}
                                            <i className="mdi mdi-cash-usd" />
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

export default AdministrativePortfolioAdmin;
