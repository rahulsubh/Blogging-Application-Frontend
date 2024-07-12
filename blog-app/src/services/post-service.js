import { myAxios, privateAxios } from "./helper";

//create post function
export const createPost = (postData) => {
    // console.log(postData);
    return privateAxios
        .post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then(response => response.data);
};

// get all posts
export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios
        .get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data);
};

//load single post of given id
export const loadPost = (postId) => {
    return myAxios
        .get("/posts/" + postId)
        .then(response => response.data);
};

// upload post banner image

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);

    return privateAxios.post(`/post/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(response => response.data);
};

// get category wise posts
export function loadPostCategoryWise(categoryId) {
    return privateAxios.get(`/category/${categoryId}/posts`)
        .then(response => response.data);
}

// get posts user wise
export const loadPostUserWise = (userId) => {
    return privateAxios.get(`/user/${userId}/posts`)
        .then(response => response.data);
};

// delete post
export const deletePosts = (postId) => {
    return privateAxios.delete(`/posts/${postId}`)
        .then(response => response.data);
};