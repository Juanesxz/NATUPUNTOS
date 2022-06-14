import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export class Login extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-center py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src={require("../../assets/images/logo1.png")} alt="logo" />
                </div>
                <h4>Bienvenido!</h4>
                <h6 className="font-weight-light">Inicia sesion.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Usuario" size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Contraseña" size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                    <Link className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn" to="/dashboard">Acceder</Link>
                  </div>
                </Form>
                <div className="text-center mt-4 font-weight-light">
                  ¿No tienes cuenta?
                  <Link to="/user-pages/register" className="text-primary">
                    Registrate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
