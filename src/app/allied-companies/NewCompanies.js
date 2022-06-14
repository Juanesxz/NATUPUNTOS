import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Trans } from 'react-i18next';
class NewCompanies extends Component {
    render() {
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">Registrar Empresa</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Lista</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Nueva Empresa</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-md-6 mx-auto  grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">REGISTRAR NUEVA EMPRESA</h4>

                            <form className="forms-sample">
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Nombre De La Empresa</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputUsername2" placeholder="Nombre" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputEmail2" className="col-sm-3 col-form-label">NIT</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputEmail2" placeholder="NIT" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputMobile" className="col-sm-3 col-form-label">Telefono</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="text" className="form-control" id="exampleInputMobile" placeholder="Telefono" />
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label">Correo</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="email" className="form-control" id="exampleInputPassword2" placeholder="Correo" />
                                    </div>
                                </Form.Group>


                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Departamento</label>
                                    <div className="col-sm-9">
                                        <select className="form-control">
                                            <option>America</option>
                                            <option>Italy</option>
                                            <option>Russia</option>
                                            <option>Britain</option>
                                        </select>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label className="col-sm-3 col-form-label">Ciudad</label>
                                    <div className="col-sm-9">
                                        <select className="form-control">
                                            <option>America</option>
                                            <option>Italy</option>
                                            <option>Russia</option>
                                            <option>Britain</option>
                                        </select>
                                    </div>
                                </Form.Group>
                                <Form.Group className="row">
                                    <label htmlFor="exampleInputPassword2" className="col-sm-3 col-form-label">Direccion</label>
                                    <div className="col-sm-9">
                                        <Form.Control type="password" className="form-control" id="exampleInputPassword2" placeholder="Direccion" />
                                    </div>
                                </Form.Group>



                                <button type="submit" className="btn btn-outline-primary mr-2">Registrar</button>

                                <Link to="/dashboard" className="btn btn-outline-light">Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default NewCompanies;