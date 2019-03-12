import {AxiosService} from "./base/AxiosService";

export const ArticleAxiosService = {
    fetchAll(query = {}) {
        const page = query.page || 1;
        const page_size = query.page_size || 5;
        if (query && query.tag)
            return AxiosService.fetchPage(`articles/by_tag/${query.tag}`, page, page_size);
        else if (query && query.category)
            return AxiosService.fetchPage(`articles/by_category/${query.category}`, page, page_size);
        else if (query && query.author)
            return AxiosService.fetchPage(`articles/by_author/${query.author}`, page, page_size);
        else
            return AxiosService.fetchPage('articles', page, page_size);
    },

    fetchBySlug(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "Slug must be a string"
            );
        }
        return AxiosService.get(`/articles/${slug}`);
    },
    create(slug, payload) {
        return AxiosService.post(`articles/${slug}/comments`, {
            comment: {body: payload}
        });
    },

    delete(slug, commentId) {
        return AxiosService.delete(`articles/${slug}/comments/${commentId}`);
    }
};
