import {AxiosService} from "./base/AxiosService";


export const CommentAxiosService = {

    create(slug, commentContentStr) {
        return AxiosService.post(`articles/${slug}/comments`, {content: commentContentStr})
    }
};
