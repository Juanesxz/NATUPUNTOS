import React, { useState, useEffect, useRef } from "react";
import { get, child, ref, set, update } from "firebase/database";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { database, uploadSupport } from "../Firebase";
import moment from "moment";

function UploadSupport() {
    const [user, setUser] = useState({
        companyname: "",
        nit: "",
        phone: "",
        email: "",
        iddepartaments: -1,
        department: "",
        city: "",
        address: "",
        latitude: "",
        length: "",
        id: "",
        photo: null,
        discountpoints: "",
    });

    const form = useRef();

    const { id } = useParams();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            user.companyname === "" ||
            user.phone === "" ||
            user.assignedcode === "" ||
            user.email === "" ||
            user.department === "" ||
            user.city === "" ||
            user.address === "" ||
            user.photo === null ||
            user.photo === undefined ||
            user.discountpoints === ""
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (
                user.photo.type === "image/jpeg" ||
                user.photo.type === "image/png" ||
                user.photo.type === "image/jpg" ||
                user.photo.type === "image/gif"
            ) {
                if (user.points >= user.discountpoints) {
                    try {
                        const infosoporte = await uploadSupport(
                            user.photo,
                            user.id,
                            user.photo.lastModified
                        );
                        await set(
                            ref(
                                database,
                                `businesssupport/${user.id}/${user.photo.lastModified}`
                            ),
                            {
                                companyname: user.companyname,
                                nit: user.nit,
                                phone: user.phone,
                                email: user.email,
                                creationdate: user.photo.lastModified,
                                imgpath: infosoporte,
                            }
                        );
                        const date = new Date();

                        const url =
                            "https://natupuntos.000webhostapp.com/api/v1/controller/emailController.php";
                        await fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                destino: user.email,
                                asunto: "Comprobante de pago",
                                cuerpo: `<hr><center><h1>COMPROBANTE DE PAGO</h1> <p>El pago para la empresa ${user.companyname
                                    } ha sido procesado de manera exitosa.  <br>
                                Se adjunta comprobante de la transacción.!</p> <img src='${infosoporte}' width='300' height='300'>
                            </center>
                            <p>Administrador Andrés Gonzalés</p>
                            ${moment(date).format("YYYY")}-${moment(
                                        date
                                    ).format("MM")}-${moment(date).format("DD")}/${moment(
                                        date
                                    ).format("h")}:${moment(date).format("mm")}:${moment(
                                        date
                                    ).format("ss")} ${moment(date).format("a")}

                            <hr>`,
                            }),
                        });

                        const newPoints = user.points - user.discountpoints;
                        update(ref(database, `empresas/${id}`), {
                            points: newPoints,
                        });

                        history.push("/administrative/administrative-portfolio");
                        toast.success("Soporte subido exitosamente");
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    toast.error(
                        "Los puntos no deben ser menores a la cantidad que se debe"
                    );
                }
            } else {
                toast.error("La imagen debe ser formato jpeg o png");
            }
        }
    };

    const handlePhoto = ({ target: { files } }) => {
        setUser({ ...user, photo: files[0] });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `empresas/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUser({ ...snapshot.val() });
                } else {
                    setUser({});
                    toast.info("No hay información");
                }
            })
            .catch(() => {
                toast.error("Error");
            });
    }, [id]);

    return (
        <div>
            <div className="d-flex align-items-center auth px-0 h-100">
                <div className="row w-100 mx-0">
                    <div className="col-lg-8 mx-auto">
                        <div className="card text-center py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                <img
                                    src={require("../../assets/images/logo1.png")}
                                    alt="logo"
                                />
                            </div>
                            <h4>SUBIR SOPORTE DE EMPRESA</h4>

                            <form ref={form} onSubmit={handleSubmit} className="pt-3">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre de la empresa</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="name"
                                        name="name"
                                        placeholder={user.companyname}
                                        value={user.companyname}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="phone"
                                        name="phone"
                                        placeholder={user.phone}
                                        value={user.phone}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="assignedcode">Nit</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        id="assignedcode"
                                        name="assignedcode"
                                        placeholder={user.nit}
                                        value={user.nit}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Correo</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        placeholder={user.email}
                                        value={user.email}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Puntos</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        name="email"
                                        placeholder={user.points}
                                        value={user.points}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discountpoints">Puntos a pagar</label>
                                    <input
                                        type={"number"}
                                        className="form-control form-control-lg"
                                        id="discountpoints"
                                        name="discountpoints"
                                        placeholder="Puntos a pagar"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo">Soporte de empresa</label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        id="photo"
                                        name="photo"
                                        placeholder="Foto"
                                        onChange={handlePhoto}
                                    />
                                </div>

                                <div className="mt-3">
                                    <button
                                        className="btn btn-block btn-success btn-lg font-weight-medium auth-form-btn"
                                        type="submit"
                                    >
                                        SUBIR SOPORTE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadSupport;
