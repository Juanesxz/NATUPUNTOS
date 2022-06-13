import React, { useState } from "react";

import { Link } from "react-router-dom";

function register() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-center py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require("../../assets/images/logo1.png")}
                  alt="logo"
                />
              </div>
              <h4>REGISTRAR NUEVO USUARIO</h4>

              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    placeholder="Nombre"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    placeholder="Correo electronico"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="phone"
                    placeholder="Telefono"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="department"
                    onChange={handleChange}
                  >
                    <option>Departamento</option>
                    <option>United States of America</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Germany</option>
                    <option>Argentina</option>
                  </select>
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="city"
                    onChange={handleChange}
                  >
                    <option>Ciudad</option>
                    <option>United States of America</option>
                    <option>United Kingdom</option>
                    <option>India</option>
                    <option>Germany</option>
                    <option>Argentina</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="exampleInputPassword1"
                    placeholder="Codigo asignado"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleInputUsername1"
                    placeholder="Direccion"
                  />
                </div>
                <div className="mt-3">
                  <Link
                    className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                    to="/dashboard"
                  >
                    INSCRIBIRSE
                  </Link>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  ¿Ya tienes una cuenta?
                  <Link to="/user-pages/login-1" className="text-primary">
                    Acceder
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default register;
