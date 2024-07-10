import { privateAxios } from "./helper";

export const createComment = (comment, postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment)
        .then(response => response.data);
};