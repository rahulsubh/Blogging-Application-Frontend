import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import { getCurrentUserDetail } from '../auth';
import { loadAllCategories } from '../services/category-service';
import { createPost as doCreatePost, uploadPostImage } from '../services/post-service';

function AddPost() {

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });

    const [image, setImage] = useState(null);


    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const editor = useRef(null);
    // const [content, setContent] = useState('');

    // const config = {
    //     placeholder: "Start typing..."
    // };



    useEffect(
        () => {
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                console.log(data);
                setCategories(data);
            }).catch(error => {
                console.log(error);
            });
        }, []);

    // console.log(categories);

    //field changed function
    const fieldChange = (event) => {
        // console.log(event);
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data });
    };

    //create post
    const createPost = (event) => {
        event.preventDefault();
        // console.log(post);
        if (post.title.trim() === '') {
            alert("post is required !!");
            return;
        }
        if (post.content.trim() === '') {
            alert("post content is required !!");
            return;
        }
        if (post.categoryId === '') {
            alert("select some category !!");
            return;
        }

        //submit the form on server
        post['userId'] = user.id;
        doCreatePost(post).then(data => {
            uploadPostImage(image, data.postId)
                .then(data => {
                    toast.success("Image Uploaded !!");
                }).catch(error => {
                    toast.error("Error in Uploading image");
                    console.log(error);
                });
            toast.success("post created");
            console.log(post);
        }).catch((error) => {
            alert("error");
            console.log(error);
        });
    };

    //handling file change event
    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    };


    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What going in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                className="rounded-0"
                                name="title"
                                onChange={fieldChange} />
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
                                value={post.content}
                                // config={config}
                                onChange={contentFieldChanged}
                            />
                        </div>
                        {/* File field */}

                        <div className="mt-3">
                            <Label for="image">Select Post Banner</Label>
                            <Input id="image" type="file" onChange={handleFileChange} />
                        </div>

                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input
                                type="select"
                                id="category"
                                placeholder="Enter here"
                                name="categoryId"
                                onChange={fieldChange}
                                className="rounded-0"
                                defaultValue={0}>
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
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost;