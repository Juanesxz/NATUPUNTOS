import React from 'react'

function ReportPointsByCity() {
    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Puntos Por Ciudad</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Reporte</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Ciudad</li>
                    </ol>
                </nav>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Puntos Ciudad</h4>
                        <div className="table-responsive">
                            <table className="table table-secondary  table-bordered">
                                <thead>
                                    <tr>
                                        <th>NOMBRE CIUDAD</th>
                                        <th>TOTAL PUNTOS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Apartado</td>
                                        <td>53275531</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReportPointsByCity