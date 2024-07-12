import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { getCurrentUserDetail } from "../../auth";
import { deletePosts, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import Post from "../../components/Post";

function UserDashboard() {

  // const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(getCurrentUserDetail());
    // setUser(getCurrentUserDetail());
    loadPostData();
  }, []);

  function loadPostData() {
    loadPostUserWise(getCurrentUserDetail().id)
      .then(data => {
        console.log(data);
        setPosts([...data.content]);
      }).catch(error => {
        console.log(error);
        toast.error("Error in loading posts by user !!");
      });
  }

  // function to delete post

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
      <Container>
        <AddPost />
        <h1 className="my-3">Posts Count : ({posts.length})</h1>
        {
          posts.map((post, index) => {
            return (
              <Post key={index} post={post} deletePost={deletePost} />
            )
          })
        }
      </Container>
    </Base>
  );
}

export default UserDashboard;
