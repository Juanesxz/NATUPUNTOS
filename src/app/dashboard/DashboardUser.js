import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";

function DashboardUser() {
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [company, setCompany] = useState({});

    useEffect(() => {
        const starCountRef = ref(database, `dashboard`);
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

    useEffect(() => {
        const starCountRef = ref(database, `users`);
        onValue(starCountRef, (snapshot) => {
            const user = snapshot.val();
            if (user !== null) {
                setUser({ ...user });
            } else {
                setUser({});
            }
        });
        return () => {
            setUser({});
        };
    }, []);

    useEffect(() => {
        const starCountRef = ref(database, `empresas`);
        onValue(starCountRef, (snapshot) => {
            const company = snapshot.val();
            if (company !== null) {
                setCompany({ ...company });
            } else {
                setCompany({});
            }
        });
        return () => {
            setCompany({});
        };
    }, []);

    const users = Object.keys(user).map((key) => user[key]);
    const companies = Object.keys(company).map((key) => company[key]);

    //suma de totalpoints
    const totalpoints = users.reduce(
        (total, user) => total + user.totalpoints,
        0
    );

    //suma de totalpoints empresas
    const totalpointscompanies = companies.reduce(
        (total, company) => total + company.totalpoints,
        0
    );

    return (
        <div>
            <div className="row">
                <div className="col-sm-3 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>AFILIADOS REGISTRADOS</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h1 className="mb-0">{users.length ? users.length : 0}</h1>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-account-plus text-primary ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>EMPRESAS REGISTRADAS</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0">
                                            {companies.length ? companies.length : 0}
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-home-modern text-danger ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>TOTAL PUNTOS AFILIADOS</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex  d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0 "> {totalpoints ? totalpoints : 0}</h2>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-note-text text-success ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h5>TOTAL PUNTOS EMPRESAS</h5>
                            <div className="row">
                                <div className="col-8 col-sm-12 col-xl-8 my-auto">
                                    <div className="d-flex  d-sm-block d-md-flex align-items-center">
                                        <h2 className="mb-0 ">
                                            {" "}
                                            {totalpointscompanies ? totalpointscompanies : 0}
                                        </h2>
                                    </div>
                                </div>
                                <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                                    <i className="icon-lg mdi mdi-chart-line text-info ml-auto"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 col-xl-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title text-center">{data.titlecarousel}</h4>
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                    className="d-block w-100"
                                    src={data.imgcarousel1}
                                    alt="First slide"
                                    width={900}
                                    height={700}
                                />
                                <Carousel.Caption>
                                    <h3>{data.titleimgcarousel1}</h3>
                                    <p>{data.labelimgcarousel1}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                    className="d-block w-100"
                                    src={data.imgcarousel2}
                                    alt="Second slide"
                                    width={900}
                                    height={700}
                                />
                                <Carousel.Caption>
                                    <h3>{data.titleimgcarousel2}</h3>
                                    <p>{data.labelimgcarousel2}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={data.imgcarousel3}
                                    alt="Third slide"
                                    width={900}
                                    height={700}
                                />
                                <Carousel.Caption>
                                    <h3>{data.titleimgcarousel3}</h3>
                                    <p>{data.labelimgcarousel3}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                        <div className="d-flex py-4">
                            <div className="preview-list w-100">
                                <div className="preview-item p-0">
                                    <div className="preview-thumbnail">
                                        <img
                                            src={require("../../assets/images/faces/face12.jpg")}
                                            className="rounded-circle"
                                            alt="face"
                                        />
                                    </div>
                                    <div className="preview-item-content d-flex flex-grow">
                                        <div className="flex-grow">
                                            <div className="d-flex d-md-block d-xl-flex justify-content-between">
                                                <h6 className="preview-subject">{data.email}</h6>
                                                <p className="text-muted text-small">
                                                    {data.createdAt}
                                                </p>
                                            </div>
                                            <p className="text-muted">{data.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-muted"> {data.descripcion} </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardUser;
