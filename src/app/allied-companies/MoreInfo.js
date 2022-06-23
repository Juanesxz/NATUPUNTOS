import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { get, child, ref } from 'firebase/database'
import { database } from '../Firebase'
import { useParams, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify'

function MoreInfo() {

    const [user, setUser] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const dbRef = ref(database)
        get(child(dbRef, `users/empresas/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setUser({ ...snapshot.val() })
            } else {
                setUser({})
                toast.info('No hay información')
            }
        }).catch(() => {
            toast.error('Error')
        })
    }, [id])

    console.log(user)




    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}  >
            <Card style={{ width: "40rem" }} className="text-center">
                <Card.Header className="success" as="h1">INFORMACION DE EMPRESA</Card.Header>
                <Card.Body >
                    <Card.Title as="h3">NOMBRE DE LA EMPRESA</Card.Title>
                    <Card.Text as="h4" >
                        {user.companyname}
                    </Card.Text>
                    <Card.Title as="h3">NIT</Card.Title>
                    <Card.Text as="h4" >
                        {user.nit}
                    </Card.Text>
                    <Card.Title as="h3">CORREO ELECTRONICO</Card.Title>
                    <Card.Text as="h4">
                        {user.email}
                    </Card.Text>
                    <Card.Title as="h3">TELEFONO</Card.Title>
                    <Card.Text as="h4">
                        {user.phone}
                    </Card.Text>
                    <Card.Title as="h3">DEPARTAMENTO</Card.Title>
                    <Card.Text as="h4">
                        {user.department}
                    </Card.Text>
                    <Card.Title as="h3">CIUDAD</Card.Title>
                    <Card.Text as="h4">
                        {user.city}
                    </Card.Text>
                    <Card.Title as="h3">DIRECCION</Card.Title>
                    <Card.Text as="h4">
                        {user.address}
                    </Card.Text>
                    <Link to="/allied-companies/companies/list">
                        <Button variant="success">Volver al inicio</Button>
                    </Link>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </div>
    )
}

export default MoreInfo;