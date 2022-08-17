import React, { useState, useEffect } from "react";
import { database } from "../Firebase";
import { useParams } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import moment from "moment";

function OverallHistory() {
    const [transfer, setTransfer] = useState({});

    const { id } = useParams();

    useEffect(() => {
        const starCountRef = ref(database, `transfer`);
        onValue(starCountRef, (snapshot) => {
            const transfer = snapshot.val();
            if (transfer !== null) {
                setTransfer({ ...transfer });
            } else {
                setTransfer({});
            }
        });
        return () => {
            setTransfer({});
        };
    }, [id]);

    return (
        <div>
            <Container
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div>
                    {Object.keys(transfer).map((key, index) => {
                        return (
                            <Card
                                className="text-center text-success"
                                style={{
                                    borderBottom: "20px solid black",
                                    padding: "13px",
                                    width: "40rem",
                                }}
                            >
                                <Card.Header className="success">
                                    <h4> {`N° DE TRANSFERENCIA `}</h4>
                                    <h4 style={{ color: "white" }}> {`${index}`}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        NOMBRE DE LA EMPRESA:{" "}
                                    </Card.Title>
                                    <Card.Text>{transfer[key].empresaName}</Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        ID DE LA EMPRESA:{" "}
                                    </Card.Title>
                                    <Card.Text>{transfer[key].empresaId}</Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        FECHA:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {`${moment(transfer[key].date).format("YYYY")}-${moment(
                                            transfer[key].date
                                        ).format("MM")}-${moment(transfer[key].date).format("DD")}`}
                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        HORA:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {`${moment(transfer[key].date).format("h")}:${moment(
                                            transfer[key].date
                                        ).format("mm")}:${moment(transfer[key].date).format(
                                            "ss"
                                        )} ${moment(transfer[key].date).format("a")}`}
                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        NOMBRE DE CLIENTE:{" "}
                                    </Card.Title>
                                    <Card.Text>{transfer[key].clientName}</Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        ID CLIENTE:{" "}
                                    </Card.Title>
                                    <Card.Text>{transfer[key].clientId}</Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        ESTADO DE LA TRANSFERENCIA:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {transfer[key].status ? "ACEPTADA" : "RECHAZADA"}
                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        PUNTOS CANJEADOS:{" "}
                                    </Card.Title>
                                    <Card.Text>{transfer[key].points}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <h4> {`N° DE REFERENCIA `}</h4>
                                    <h4 style={{ color: "white" }}> {`${key}`}</h4>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

export default OverallHistory;
