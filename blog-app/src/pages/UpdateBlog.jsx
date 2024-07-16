import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import Base from '../components/Base'
import userContext from '../context/userContext';
import { loadAllCategories } from '../services/category-service';
import { loadPost, updatePost } from '../services/post-service';

function UpdateBlog() {

    const [categories, setCategories] = useState([]);
    const { blogId } = useParams();
    const object = useContext(userContext);
    const [post, setPost] = useState(null);

    const navigate = useNavigate();

    const editor = useRef(null);

    useEffect(() => {

        loadAllCategories().then((data) => {
            console.log(data);
            setCategories(data);
        }).catch(error => {
            console.log(error);
        });

        //load the blog from database
        loadPost(blogId).then(data => {
            console.log(data);
            setPost({ ...data, categoryId: data.category.categoryId });
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading the blog");
        });
    }, []);

    useEffect(() => {
        if (post) {
            if (post.user.id !== object.user.data.id) {
                toast.error("This is not your post");
                navigate("/");
            }
        }
    }, [post]);

    const handleChange = (event, fieldName) => {
        setPost({
            ...post,
            [fieldName]: event.target.value
        });
    };

    const updatePosts = (event) => {
        event.preventDefault();
        console.log(post);
        updatePost({ ...post, category: { categoryId: post.categoryId } }, post.postId)
            .then(data => {
                console.log(data);
                toast.success("post updated !!");
            }).catch(error => {
                console.log(error);
                toast.error("Error in updating post !!");
            });
    };

    const updateHtml = () => {
        return (
            <div className="wrapper">
                <Card className="shadow-sm border-0 mt-2">
                    <CardBody>
                        {/* {JSON.stringify(post)} */}
                        <h3>Update Post from here !!</h3>
                        <Form onSubmit={updatePosts}>
                            <div className="my-3">
                                <Label for="title">Post title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter here"
                                    className="rounded-0"
                                    name="title"
                                    value={post.title}
                                    onChange={(event) => handleChange(event, 'title')} />
                            </div>
                            <div className="my-3">
                                <Label for="content">Post Content</Label>
                                {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                className="rounded-0"
                                style={{ height: '300px' }} /> */}
                                <JoditEditor
                                    ref={editor}
                                    // config={config}
                                    value={post.content}
                                    onChange={newContent => setPost({ ...post, content: newContent })}
                                />
                            </div>
                            {/* File field */}

                            <div className="mt-3">
                                <Label for="image">Select Post Banner</Label>
                                <Input id="image" type="file" onChange={''} />
                            </div>

                            <div className="my-3">
                                <Label for="category">Post Category</Label>
                                <Input
                                    type="select"
                                    id="category"
                                    placeholder="Enter here"
                                    name="categoryId"
                                    onChange={(event) => handleChange(event, 'categoryId')}
                                    className="rounded-0"
                                    value={post.categoryId}>
                                    <option disabled value={0}>--Select category--</option>
                                    {
                                        categories.map((category) => (
                                            <option value={category.categoryId} key={category.categoryId}>
                                                {category.categoryTitle}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </div>

                            <Container className="text-center">
                                <Button type="submit" className="rounded-0" color="primary">Update Post</Button>
                                <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    };

    return (
        <Base>
            <Container>
                {post && updateHtml()}
            </Container>
        </Base>
    )
}

export default UpdateBlog