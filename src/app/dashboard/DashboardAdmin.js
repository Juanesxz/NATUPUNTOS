import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { database } from "../Firebase";
import { ref, onValue } from "firebase/database";

function DashboardAdmin() {
    const [data, setData] = useState({});

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

    return (
        <div>
            <div className="row">
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">$12.34</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">
                                            +3.5%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">
                                Potential growth
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">$17.34</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">
                                            +11%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success">
                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Revenue current</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">$12.34</h3>
                                        <p className="text-danger ml-2 mb-0 font-weight-medium">
                                            -2.4%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-danger">
                                        <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Daily Income</h6>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-9">
                                    <div className="d-flex align-items-center align-self-start">
                                        <h3 className="mb-0">$31.53</h3>
                                        <p className="text-success ml-2 mb-0 font-weight-medium">
                                            +3.5%
                                        </p>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="icon icon-box-success ">
                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                    </div>
                                </div>
                            </div>
                            <h6 className="text-muted font-weight-normal">Expense current</h6>
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
                                            <p className="text-muted">
                                                {data.role}
                                            </p>
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

export default DashboardAdmin;
