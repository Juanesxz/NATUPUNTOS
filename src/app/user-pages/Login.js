import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
// eslint-disable-next-line no-unused-vars
import { toast } from "react-toastify";

function Login() {
  // eslint-disable-next-line no-undef
  const [users, setUsers] = useState({
    email: "",
    assignedcode: "",
  });

  const { login, user } = useAuth();
  const history = useHistory();

  console.log(user);

  const handleChange = ({ target: { name, value } }) =>
    setUsers({ ...users, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (users.email === "" || users.assignedcode === "") {
      toast.error("Debe llenar todos los campos");
    } else {
      try {
        await login(users.email, users.assignedcode);

        history.push("/dashboard");
        toast.success("Ingreso exitoso");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("El correo ya está en uso");
        }
        if (error.code === "auth/invalid-email") {
          toast.error("El correo no es válido");
        }
        if (error.code === "auth/weak-password") {
          toast.error("La contraseña debe tener al menos 6 caracteres");
        }
        if (error.code === "auth/operation-not-allowed") {
          toast.error("La cuenta no está habilitada");
        }
        if (error.code === "auth/user-not-found") {
          toast.error("El usuario no existe");
        }
        if (error.code === "auth/wrong-password") {
          toast.error("La contraseña es incorrecta");
        }
      }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-center py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require("../../assets/images/logo1.png")}
                  alt="logo"
                />
              </div>
              <h4>Bienvenido!</h4>
              <h6 className="font-weight-light">Inicia sesion.</h6>
              <Form onSubmit={handleSubmit} className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Usuario"
                    size="lg"
                    className="h-auto"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="d-flex search-field">
                  <Form.Control
                    type="password"
                    id="assignedcode"
                    name="assignedcode"
                    placeholder="Contraseña"
                    size="lg"
                    className="h-auto"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="mt-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                  >
                    Acceder
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
