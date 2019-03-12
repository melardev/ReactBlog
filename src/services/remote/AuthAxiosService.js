import axi from "./base/AxiosService";

const axios = axi();
export const AuthAxiosService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
    };

    return axios.post('users/login', {
        username, password
    }).then(result => {
        debugger;
        if (result.data && result.data.success && result.data.token) {
            return result.data;
        }
    }).catch(err => {
        debugger;
        console.error(err);
    });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
}

function getAll() {

}

function getById(id) {

}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    };

    return axios.post('/users/register', {
        ...user
    }).then(handleResponse);
}

function update(user) {
    return axios.get(`/users/${user.id}`).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {

    return axios.delete(`/users/${id}`, {}).then(handleResponse);
}

function handleResponse(response) {
    console.log(response);
}

