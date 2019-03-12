import {AxiosService} from "./base/AxiosService";

export const TagsAxiosService = {
    fetchAll() {
        return AxiosService.fetchPage('tags');
    },
};