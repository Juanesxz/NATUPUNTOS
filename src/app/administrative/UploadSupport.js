import React, { useState, useEffect, useRef } from "react";
import { get, child, ref, set } from "firebase/database";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { database, uploadSupport } from "../Firebase";
import emailjs from "@emailjs/browser";

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
    });

    const form = useRef();

    const { id } = useParams();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "service_cop43vv",
                "template_0kigbhg",
                form.current,
                "6zVwejyu3xogiXS2W"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );

        if (
            user.name === "" ||
            user.phone === "" ||
            user.assignedcode === "" ||
            user.email === "" ||
            user.department === "" ||
            user.city === "" ||
            user.address === "" ||
            user.photo === null
        ) {
            toast.error("Debe llenar todos los campos");
        } else {
            if (user.photo.type === "image/jpeg" || user.photo.type === "image/png") {
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
                    console.log(infosoporte);
                    history.push("/administrative/administrative-portfolio");
                    toast.success("Soporte subido exitosamente");
                } catch (error) {
                    console.log(error);
                }
            } else {
                toast.error("La imagen debe ser formato jpeg o png");
            }
        }
    };

    const handlePhoto = ({ target: { files } }) => {
        setUser({ ...user, photo: files[0] });
    };

    useEffect(() => {
        const dbRef = ref(database);
        get(child(dbRef, `empresas/${id}`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setUser({ ...snapshot.val() });
                } else {
                    setUser({});
                    toast.info("No hay informaci??n");
                }
            })
            .catch(() => {
                toast.error("Error");
            });
    }, [id]);

    console.log(user);

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
                                    <label htmlFor="phone">Tel??fono</label>
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
