import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap';
import { getCurrentUserDetail, isLoggedIn } from '../auth';

const ViewUserProfile = ({ user }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setCurrentUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, []);

    return (
        <Card className="mt-2 border-0 rounded-0 shadow-sm">
            <CardBody>
                <h3 className="text-uppercase">user Information</h3>
                <Container className="text-center">
                    <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={user.image ? user.image : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1721117873~exp=1721121473~hmac=d27415f34d75427f130cb46be04665451b50503a4be23e56b9eb639bbc841640&w=740"} alt="user profile picture" className="img-fluid rounded-circle" />
                </Container>
                <Table responsive striped hover bordered={true} className='mt-5 text-center'>
                    <tbody>
                        <tr>
                            <td>
                                RAHULBLOGS ID
                            </td>
                            <td>
                                RA{user?.id}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                USER NAME
                            </td>
                            <td>
                                {user?.name}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                USER EMAIL
                            </td>
                            <td>
                                {user?.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ABOUT
                            </td>
                            <td>
                                {user?.about}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                ROLE
                            </td>
                            <td>
                                {user.roles.map(role => {
                                    return (
                                        <div key={role.id}>{role.name}</div>
                                    )
                                })}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {currentUser ? (currentUser.id === user.id) ? (
                    <CardFooter className="text-center">
                        <Button color="warning">Update Profile</Button>
                    </CardFooter>
                ) : '' : ''}
            </CardBody>
        </Card>
    )
}

export default ViewUserProfile