import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import Base from '../components/Base'
import CategorySideMenu from '../components/CategorySideMenu';
import Post from '../components/Post';
import { deletePosts, loadPostCategoryWise } from '../services/post-service';

function Categories() {

    const [posts, setPosts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(data => {
            console.log(data);
            setPosts([...data.content]);
        }).catch(error => {
            toast.error("Error in loading Posts by Category !!");
            console.log(error);
        });
    }, [categoryId]);

    const deletePost = (post) => {
        //going to delete post
        deletePosts(post.postId).then(data => {
          console.log(data);
          toast.success("Post Deleted ..");
          let newPosts = posts.filter(p => p.postId !== post.postId);
          setPosts([...newPosts]);
        }).catch(error => {
          console.log(error);
          toast.error("Error in deleting post !!");
        });
      };

    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Blogs Count ({posts.length})</h1>
                        {posts && posts.map((post, index) => {
                            return (
                                <Post deletePost={deletePost} key={index} post={post} />
                            )
                        })}
                        {posts.length <= 0 ? <h1>No post in this category</h1> : ''}
                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Categories