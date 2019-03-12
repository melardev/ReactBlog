import axios from "axios";
import {UserService} from "../../local/UsersService";

let cachedUser = {};

function onUserChanged(user) {
    cachedUser = user;
}

UserService.subscribe(onUserChanged);

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    responseType: 'json',
    responseEncoding: 'utf8'
});

axiosInstance.interceptors.request.use((config) => {
    if (cachedUser.token)
        config.headers.authorization = "Bearer " + cachedUser.token;
    return config;
}, function (error) {
    return Promise.reject(error);
});

function get(url) {
    return axiosInstance.get(url)
}

function post(url, data) {
    return axiosInstance.post(url, data);
}

function put() {

}

function destroy(url) {

}

function setUser(user) {
    cachedUser = user;
}

const fetchPage = (url, page, page_size) => {
    return axiosInstance.get(`${url}?page=${page || 1}&page_size=${page_size || 5}`)
};

export const AxiosService = {
    axiosInstance,
    fetchPage,
    get,
    setUser,
    post,
    put,
    destroy
};
