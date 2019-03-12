import {AxiosService} from "./base/AxiosService";

export const CategoriesAxiosService = {
    fetchAll() {
        return AxiosService.fetchPage('categories');
    },
};