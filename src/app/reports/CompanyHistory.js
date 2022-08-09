import React, { useState, useEffect } from "react";
import { database } from "../Firebase";
import { useParams, Link } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import moment from "moment";

function CompanyHistory() {
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

    console.log(transfer);

    return (
        <Container style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }} >
            <div >
                {Object.keys(transfer).map((key, index) => {
                    if (transfer[key].empresaId === id) {
                        return (

                            <Card className="text-center text-success" style={{ borderBottom: "20px solid black", padding: "13px", width: "40rem" }}>
                                <Card.Header className="success">
                                    <h4>  {`N° de transferencia `}</h4>
                                    <h4 style={{ color: "white" }}> {`${key}`}</h4>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        Nombre de empresa:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {transfer[key].empresaName}
                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        Fecha:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {`${moment(transfer[key].date).format("YYYY")}-${moment(
                                            transfer[key].date
                                        ).format("MM")}-${moment(transfer[key].date).format(
                                            "DD"
                                        )}`}


                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        Hora:{" "}
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
                                        Nombre de cliente:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {transfer[key].clientId}
                                    </Card.Text>
                                    <Card.Title
                                        style={{ display: "inline-block", margin: "5px" }}
                                        as="h4"
                                    >
                                        Puntos canjeados:{" "}
                                    </Card.Title>
                                    <Card.Text>
                                        {transfer[key].points}
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </Container>

    );
}

export default CompanyHistory;
