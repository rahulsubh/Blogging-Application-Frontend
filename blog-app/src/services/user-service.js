import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
    return myAxios
        .post('/auth/register', user)
        .then(response => response.data);
}

export const loginUser = (loginDetail) => {
    return myAxios
        .post('/auth/login', loginDetail)
        .then((response) => response.data);
};

export const getUser = (userId) => {
    return myAxios.get(`/users/${userId}`)
        .then(response => response.data);
};

export const updateUser = (userId,user) => {
    return privateAxios.put(`/users/${userId}`,user)
        .then(response => response.data);
};