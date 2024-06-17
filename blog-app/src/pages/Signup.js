import React, { useState } from 'react'
import { signUp } from '../services/user-service';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../components/Base'
import { toast } from 'react-toastify';

function Signup() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    // handle change

    const handleChange = (e, property) => {
        // dynamic setting the values
        setData({ ...data, [property]: e.target.value })
    }

    // resetting the form
    const resetData = () => {
        setData(
            {
                name: '',
                email: '',
                password: '',
                about: ''
            }
        );
    }

    // submit the form
    const submitForm = (event) => {
        event.preventDefault();
        // if(error.isError){
        //     toast.error("Form data is invalid , correct all details then submit !!");
        //     setError({...error,isError:false});
        //     return;
        // }
        console.log(data);
        // data validate
        //call server api for sending data
        signUp(data).then((resp) => {
            console.log(resp);
            console.log("success log");
            toast.success("User Registered Successfully !!");
            setData({
                name: '',
                email: '',
                password: '',
                about: ''
            });
        }).catch((error) => {
            console.log(error);
            console.log("Error log");
            //handle errors in proper way
            setError({
                errors:error,
                isError:true
            });
        })
    }
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
                                <Form onSubmit={submitForm}>


                                    {/*Name field*/}
                                    <FormGroup>
                                        <Label for="name">Enter Name</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter here"
                                            id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid={error.errors?.response?.data?.name ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.name}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/*email field*/}
                                    <FormGroup>
                                        <Label for="email">Enter Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter here"
                                            id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}
                                            invalid={error.errors?.response?.data?.email ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.email}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/*password field*/}
                                    <FormGroup>
                                        <Label for="password">Enter Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter here"
                                            id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid={error.errors?.response?.data?.password ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.password}
                                        </FormFeedback>
                                    </FormGroup>
                                    {/*text area field*/}
                                    <FormGroup>
                                        <Label for="about">About</Label>
                                        <Input
                                            type="textarea"
                                            placeholder="Enter here"
                                            id="about"
                                            style={{ height: "250px" }}
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={data.about}
                                            invalid={error.errors?.response?.data?.about ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.errors?.response?.data?.about}
                                        </FormFeedback>
                                    </FormGroup>

                                    <Container className="text-center">
                                        <Button color="light" outline>Register</Button>
                                        <Button onClick={resetData} color="secondary" className="ms-2" type="reset">Reset</Button>
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