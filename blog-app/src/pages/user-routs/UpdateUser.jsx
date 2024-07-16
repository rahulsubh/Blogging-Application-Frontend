import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../../components/Base';
import { getUser } from '../../services/user-service';
import { updateUser as doUpdateUser } from '../../services/user-service';

const UpdateUser = () => {

    const [user, setUser] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        getUser(id).then(data => {
            console.log(data);
            setUser({ ...data });
        });
    }, []);

    const handleChange = (event, fieldName) => {
        event.preventDefault();
        setUser({
            ...user,
            [fieldName]: event.target.value
        });
    };

    // resetting the form
    const resetData = () => {
        setUser(
            {
                name: '',
                email: '',
                about: ''
            }
        );
    }

    const updateUser = () => {
        console.log(user);
        doUpdateUser(id, user)
            .then(data => {
                console.log(data);
                toast.success("User Updated");
            }).catch(error => {
                console.log(error);
                toast.error("Error in upfdating user !!");
            });
    };

    const updateUserView = () => {
        return(
            <Container>
                <Row className="mt-4">
                    <Col sm={{ size: 6, offset: 3 }}>
                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Update User</h3>
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
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={user.name}
                                        // invalid={error.errors?.response?.data?.name ? true : false}
                                        />
                                        <FormFeedback>
                                            {/* {error.errors?.response?.data?.name} */}
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
                                            value={user.email}
                                        // invalid={error.errors?.response?.data?.email ? true : false}
                                        />
                                        <FormFeedback>
                                            {/* {error.errors?.response?.data?.email} */}
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
                                            value={user.about}
                                        // invalid={error.errors?.response?.data?.about ? true : false}
                                        />
                                        <FormFeedback>
                                            {/* {error.errors?.response?.data?.about} */}
                                        </FormFeedback>
                                    </FormGroup>

                                    <Container className="text-center">
                                        <Button onClick={updateUser} color="light" outline>Update</Button>
                                        <Button onClick={resetData} color="secondary" className="ms-2" type="reset">Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    };

    return (
        <Base>
        {user ? updateUserView() : ''}    
        </Base>

    )
}

export default UpdateUser