import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../components/Base'

function Signup() {
    return (
        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Fill Information to Register</h3>
                            </CardHeader>
                            <CardBody>
                                {/* {creating form} */}
                                <Form>


                                    {/*Name field*/}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter here"
                                            id="name"
                                        />
                                    </FormGroup>
                                    {/*email field*/}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter here"
                                            id="email"
                                        />
                                    </FormGroup>
                                    {/*password field*/}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter here"
                                            id="password"
                                        />
                                    </FormGroup>
                                    {/*text area field*/}
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input
                                            type="textarea"
                                            placeholder="Enter here"
                                            id="about"
                                            style={{ height: "250px" }}
                                        />
                                    </FormGroup>

                                    <Container className="text-center">
                                        <Button color="light" outline>Register</Button>
                                        <Button color="secondary" className="ms-2" type="reset">Reset</Button>
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

export default Signup