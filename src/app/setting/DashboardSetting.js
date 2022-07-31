import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ref, set } from "firebase/database";
import { database, CarouselImg, CarouselImg2, CarouselImg3 } from "../Firebase";
import { useHistory } from "react-router-dom";

function DashboardSetting() {
    const [users, setUsers] = useState({
        titlecarousel: "",
        titleimgcarousel1: "",
        labelimgcarousel1: "",
        imgcarousel1: "",
        titleimgcarousel2: "",
        labelimgcarousel2: "",
        imgcarousel2: "",
        titleimgcarousel3: "",
        labelimgcarousel3: "",
        imgcarousel3: "",
        descripcion: "",
    });

    const history = useHistory();

    const { user } = useAuth();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const handleChange = ({ target: { name, value } }) => {
        setUsers({ ...users, [name]: value });
    };

    const handleChangeFile = ({ target: { name, files } }) => {
        setUsers({ ...users, [name]: files[0] });
    };

    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            users.titlecarousel === "" ||
            users.titleimgcarousel1 === "" ||
            users.labelimgcarousel1 === "" ||
            users.imgcarousel1 === "" ||
            users.titleimgcarousel2 === "" ||
            users.labelimgcarousel2 === "" ||
            users.imgcarousel2 === "" ||
            users.titleimgcarousel3 === "" ||
            users.labelimgcarousel3 === "" ||
            users.imgcarousel3 === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (users.role === "ADMINISTRADOR") {
                toast.error("No puedes crear un perfil de administrador");
            } else {
                try {
                    const urlimg1 = await CarouselImg(users.imgcarousel1);
                    const urlimg2 = await CarouselImg2(users.imgcarousel2);
                    const urlimg3 = await CarouselImg3(users.imgcarousel3);
                    const refusers = ref(database, "dashboard/");
                    await set(refusers, {
                        titlecarousel: users.titlecarousel,
                        titleimgcarousel1: users.titleimgcarousel1,
                        labelimgcarousel1: users.labelimgcarousel1,
                        imgcarousel1: urlimg1,
                        titleimgcarousel2: users.titleimgcarousel2,
                        labelimgcarousel2: users.labelimgcarousel2,
                        imgcarousel2: urlimg2,
                        titleimgcarousel3: users.titleimgcarousel3,
                        labelimgcarousel3: users.labelimgcarousel3,
                        imgcarousel3: urlimg3,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        createdAt: `${day}/${month}/${year}`,
                        descripcion: users.descripcion,
                    });

                    toast.success("El dashboard se ha actualizado");
                    history.push("/dashboard");
                } catch (error) {
                    toast.error("Error al actualizar el dashboard");
                }
            }
        }
    };

    return (
        <div>
            {user.role === "ADMINISTRADOR" ? (
                <div>
                    <div className="d-flex align-items-center auth px-0 h-100">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-7 mx-auto">
                                <div className="card text-center py-5 px-4 px-sm-5">
                                    <div className="brand-logo">
                                        <img
                                            src={require("../../assets/images/logo1.png")}
                                            alt="logo"
                                        />
                                    </div>
                                    <h4>CONFIGURACION DEL DASHBOARD</h4>

                                    <form onSubmit={handleSubmit} className="pt-3">
                                        <p className="card-description">
                                            CONFIGURACION DE LA PRIMER IMAGEN DEL CARROUSEL
                                        </p>
                                        <div className="form-group">
                                            <label htmlFor="titlecarousel">TITULO CAROUSEL</label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="titlecarousel"
                                                name="titlecarousel"
                                                placeholder="Titulo del carousel"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="titleimgcarousel1">
                                                TITULO IMAGEN CAROUSEL 1
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="titleimgcarousel1"
                                                name="titleimgcarousel1"
                                                placeholder="Titulo de la imagen carousel 1"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="labelimgcarousel1">
                                                ETIQUETA IMAGEN CAROUSEL 1
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="labelimgcarousel1"
                                                name="labelimgcarousel1"
                                                placeholder="Etiqueta de la imagen carousel 1"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="imgcarousel1">IMAGEN CAROUSEL 1</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imgcarousel1"
                                                name="imgcarousel1"
                                                onChange={handleChangeFile}
                                            />
                                        </div>

                                        <p className="card-description">
                                            CONFIGURACION DE LA SEGUNDO IMAGEN DEL CARROUSEL
                                        </p>
                                        <div className="form-group">
                                            <label htmlFor="titleimgcarousel2">
                                                TITULO IMAGEN CAROUSEL 2
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="titleimgcarousel2"
                                                name="titleimgcarousel2"
                                                placeholder="Titulo de la imagen carousel 2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="labelimgcarousel2">
                                                ETIQUETA IMAGEN CAROUSEL 2
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="labelimgcarousel2"
                                                name="labelimgcarousel2"
                                                placeholder="Etiqueta de la imagen carousel 2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="imgcarousel2">IMAGEN CAROUSEL 2</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imgcarousel2"
                                                name="imgcarousel2"
                                                onChange={handleChangeFile}
                                            />
                                        </div>
                                        <p className="card-description">
                                            CONFIGURACION DE LA TERCER IMAGEN DEL CARROUSEL
                                        </p>
                                        <div className="form-group">
                                            <label htmlFor="titleimgcarousel3">
                                                TITULO IMAGEN CAROUSEL 3
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="titleimgcarousel3"
                                                name="titleimgcarousel3"
                                                placeholder="Titulo de la imagen carousel 3"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="labelimgcarousel3">
                                                ETIQUETA IMAGEN CAROUSEL 3
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="labelimgcarousel3"
                                                name="labelimgcarousel3"
                                                placeholder="Etiqueta de la imagen carousel 3"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="imgcarousel3">IMAGEN CAROUSEL 3</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="imgcarousel3"
                                                name="imgcarousel3"
                                                onChange={handleChangeFile}
                                            />
                                        </div>
                                        <p className="card-description">MENSAJE DESCRIPTIVO</p>
                                        <div className="form-group">
                                            <label htmlFor="labelimgcarousel3">
                                                DESCRIPCION DE MENSAJE DE ETIQUETA
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="descripcion"
                                                name="descripcion"
                                                placeholder="Descripcion"
                                                onChange={handleChange}
                                            />
                                        </div>

                                        {/* Boton de formulario */}
                                        <div className="mt-3">
                                            <button
                                                className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                                                type="submit"
                                            >
                                                INSCRIBIRSE
                                            </button>
                                        </div>
                                        <div className="bntext-center mt-4 font-weight-light">
                                            <Link to="/dashboard" className="btn btn-outline-danger ">
                                                volver
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h1>SOLO EL ADMINISTRADOR PUEDE VER ESTE MODULO</h1>
                    <div className="bntext-center mt-4 font-weight-light">
                        <Link to="/dashboard" className="btn btn-outline-danger ">
                            volver
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardSetting;
