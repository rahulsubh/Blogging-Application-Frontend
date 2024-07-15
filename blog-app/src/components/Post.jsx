import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth';
import userContext from '../context/userContext';

function Post({ post = { id: -1, title: "This is the default post title", content: "This is the default content" }, deletePost }) {

    const userContextData = useContext(userContext);
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(null);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        setLogin(isLoggedIn());
    }, []);

    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 60) + "...." }}>

                </CardText>
                <div>
                    <Link className="btn btn-secondary border-0" to={'/posts/' + post.postId}>Read More</Link>
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={() => deletePost(post)} color="danger" className="ms-2">Delete</Button> : '') }
                </div>
            </CardBody>
        </Card>
    )
}

export default Post