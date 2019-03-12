export default class LocalStorageService {
    static save(key, value) {
        localStorage.setItem(key, value);
    }

    static get(key) {
        return localStorage.getItem(key);
    }

    static clear(key) {
        window.localStorage.removeItem(key);
    }
};

