import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { get, child, ref } from "firebase/database";
import { database } from "../Firebase";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";

function MoreInfo() {
    const [user, setUser] = useState({});
    const { id } = useParams();

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
        <Container>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Card style={{ width: "40rem", padding: "13px" }} className="text-center text-success">
                    <Card.Header className="success" as="h3">
                        INFORMACION DE EMPRESA
                    </Card.Header>
                    <Card.Body>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            NOMBRE DE LA EMPRESA:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.companyname}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            NIT:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.nit}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            CORREO ELECTRONICO:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.email}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            TELEFONO:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.phone}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            DEPARTAMENTO:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.department}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            CIUDAD:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.city}</Card.Text>
                        <br></br>
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            DIRECCION:{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{user.address}</Card.Text>

                        <br />
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            LATITUD :{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{!user.latitude ? "No se a registrado" : user.latitude}</Card.Text>
                        <br />
                        <Card.Title
                            style={{ display: "inline-block", margin: "5px" }}
                            as="h4"
                        >
                            LONGITUD :{" "}
                        </Card.Title>
                        <Card.Text as="display-5">{!user.length ? "No se a registrado" : user.length}</Card.Text>
                        <br />
                        <Card.Title
                            style={{ display: "block", margin: "5px" }}
                            as="h4"
                        >
                            IMAGEN DE LA EMPRESA :{" "}
                        </Card.Title>
                        <Card.Img style={{ width: "16rem", height: "16rem" }} variant="top" src={user.imgpath} />
                        <Card.Body>
                        </Card.Body>
                        <Link to="/allied-companies/companies/list">
                            <Button variant="success">Volver al inicio</Button>
                        </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
            </div>
        </Container>
    );
}

export default MoreInfo;
