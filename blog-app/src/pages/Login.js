import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../components/Base'

function Login() {
    return (
        <Base>
           <Container>
            <Row className="mt-4">
                <Col sm = {
                    {
                        size:6,
                        offset:3
                    }
                }>
                 <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Login Here !!</h3>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            {/*Email field*/}
                            <FormGroup>
                                <Label for="email">Enter Email</Label>
                                <Input
                                type="text"
                                id="email"
                                />
                            </FormGroup>
                            {/*Password field*/}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input
                                type="password"
                                id="password"
                                />
                            </FormGroup>
                            <Container className="text-center">
                                <Button color="light" outline>Login</Button>
                                <Button className="ms-2" color="secondary">Reset</Button>
                            </Container>
                        </Form>
                    </CardBody>
                    </Card>   
                </Col>
            </Row>
            </Container> 
        </Base>
    )
}

export default Login