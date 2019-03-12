export const LocalStorageService = {
    get(key) {
        if (typeof window === "undefined")
            return null;
        return localStorage.getItem(key);
    },
    set(key, value) {
        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear(key) {
        localStorage.removeItem(key);
    },
    delete(key) {
        localStorage.removeItem(key);
    },
    clearAll() {
        localStorage.clear();
    }
};