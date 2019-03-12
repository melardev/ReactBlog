import {AxiosService} from "./base/AxiosService";


export const AxiosUsersService = {

    login(user) {
        return AxiosService.post('/auth/login/', user);
    },

    create(user) {
        return AxiosService.post('/users/', user);
    },
};
