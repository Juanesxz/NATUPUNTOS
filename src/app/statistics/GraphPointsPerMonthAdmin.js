import React, { useState, useEffect } from "react";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
function GraphPointsPerMonthAdmin() {
    const [data, setData] = useState({});

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
    }, []);

    const datosparseados = Object.keys(data).map((key) => {
        return {
            fechacompleta: data[key].date,
            año: parseInt(moment(data[key].date).format("YYYY")),
            mes: parseInt(moment(data[key].date).format("MM")),
            dia: parseInt(moment(data[key].date).format("DD")),
            puntos: parseInt(data[key].points),
        };
    });

    //sumar los puntos por mes
    const sumarPuntosPorMes = (datosparseados) => {
        let fecha = {
            enero: 0,
            febrero: 0,
            marzo: 0,
            abril: 0,
            mayo: 0,
            junio: 0,
            julio: 0,
            agosto: 0,
            septiembre: 0,
            octubre: 0,
            noviembre: 0,
            diciembre: 0,
        };
        datosparseados.forEach((element) => {
            if (element.mes === 1) {
                fecha.enero += element.puntos;
            } else if (element.mes === 2) {
                fecha.febrero += element.puntos;
            } else if (element.mes === 3) {
                fecha.marzo += element.puntos;
            } else if (element.mes === 4) {
                fecha.abril += element.puntos;
            } else if (element.mes === 5) {
                fecha.mayo += element.puntos;
            } else if (element.mes === 6) {
                fecha.junio += element.puntos;
            } else if (element.mes === 7) {
                fecha.julio += element.puntos;
            } else if (element.mes === 8) {
                fecha.agosto += element.puntos;
            } else if (element.mes === 9) {
                fecha.septiembre += element.puntos;
            } else if (element.mes === 10) {
                fecha.octubre += element.puntos;
            } else if (element.mes === 11) {
                fecha.noviembre += element.puntos;
            } else if (element.mes === 12) {
                fecha.diciembre += element.puntos;
            }
        });
        return fecha;
    };

    const areaData = {
        labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        datasets: [
            {
                label: "Puntos por mes",
                data: [
                    sumarPuntosPorMes(datosparseados).enero,
                    sumarPuntosPorMes(datosparseados).febrero,
                    sumarPuntosPorMes(datosparseados).marzo,
                    sumarPuntosPorMes(datosparseados).abril,
                    sumarPuntosPorMes(datosparseados).mayo,
                    sumarPuntosPorMes(datosparseados).junio,
                    sumarPuntosPorMes(datosparseados).julio,
                    sumarPuntosPorMes(datosparseados).agosto,
                    sumarPuntosPorMes(datosparseados).septiembre,
                    sumarPuntosPorMes(datosparseados).octubre,
                    sumarPuntosPorMes(datosparseados).noviembre,
                    sumarPuntosPorMes(datosparseados).diciembre,
                ],
                backgroundColor: [
                    "rgba(255, 183, 0, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,183,0,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const datas = {
        labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ],
        datasets: [
            {
                label: "Puntos por mes",
                data: [
                    sumarPuntosPorMes(datosparseados).enero,
                    sumarPuntosPorMes(datosparseados).febrero,
                    sumarPuntosPorMes(datosparseados).marzo,
                    sumarPuntosPorMes(datosparseados).abril,
                    sumarPuntosPorMes(datosparseados).mayo,
                    sumarPuntosPorMes(datosparseados).junio,
                    sumarPuntosPorMes(datosparseados).julio,
                    sumarPuntosPorMes(datosparseados).agosto,
                    sumarPuntosPorMes(datosparseados).septiembre,
                    sumarPuntosPorMes(datosparseados).octubre,
                    sumarPuntosPorMes(datosparseados).noviembre,
                    sumarPuntosPorMes(datosparseados).diciembre,
                ],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Grafica de puntos por mes</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                Estadistica
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Mensual
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Puntos</h4>
                            <Line data={areaData} />
                        </div>
                    </div>
                </div>

                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Puntos</h4>
                            <Bar data={datas} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraphPointsPerMonthAdmin;
