import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";
import { Line, Bar } from "react-chartjs-2";

function GraphCompanyPoints() {
    const { user } = useAuth();
    const [data, setData] = useState({});

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
    }, []);

    const nombre = Object.keys(data).map((item, i) => data[item]);



    const backgroundColor = [];
    const borderColor = [];
    for (let i = 0; i < nombre.length; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        backgroundColor.push(`rgba(` + r + `, ` + g + `, ` + b + `, 0.2)`);
        borderColor.push(`rgba(` + r + `, ` + g + `, ` + b + `, 1)`);
    }

    const areaData = {
        labels: nombre?.map((company) => company.companyname),
        datasets: [
            {
                label: `${nombre?.length} empresas`,
                data: nombre?.map((company) => company.totalpoints),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const datas = {
        labels: nombre?.map((company) => company.companyname),
        datasets: [
            {
                label: `${nombre?.length} empresas`,
                data: nombre?.map((company) => company.totalpoints),
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
                fill: false,
            },
        ],
    };


    return (
        <div>
            {user.role !== "null" && user.readcompaniespointsstatistics === "true" ? (
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
                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Area Chart</h4>
                                    <Line data={areaData} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Bar Chart</h4>
                                    <Bar data={datas} />
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

export default GraphCompanyPoints;
