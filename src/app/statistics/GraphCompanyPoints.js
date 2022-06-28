import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Line, Bar } from "react-chartjs-2";
import { database } from "../Firebase";
import { onValue, ref } from "firebase/database";

function GraphCompanyPoints() {
    const { id } = useParams();
    const [datas, setDatas] = useState({});

    useEffect(() => {
        const starCountRef = ref(database, `users/afiliados`);
        onValue(starCountRef, (snapshot) => {
            const datas = snapshot.val();
            if (datas !== null) {
                setDatas({ ...datas });
            } else {
                setDatas({});
            }
        });
        return () => {
            setDatas({});
        };
    }, [id]);

    const areaData = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
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
                ],
                borderWidth: 1,
                fill: true, // 3: no fill
            },
        ],
    };

    const data = {
        labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
        datasets: [
            {
                label: "# of Votes",
                data: [10, 19, 3, 5, 2, 3],
                backgroundColor: [
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
                ],
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title">Grafica de puntos por compañia</h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="!#" onClick={(event) => event.preventDefault()}>
                                Estadistica
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Quincenal
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Area Chart</h4>
                            <Line data={areaData} />
                        </div>
                    </div>
                </div>

                <div className="col-md-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bar Chart</h4>
                            <Bar data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GraphCompanyPoints;
