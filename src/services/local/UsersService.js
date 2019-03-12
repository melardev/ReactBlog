import {LocalStorageService} from "./base/LocalStorageService";

let observers = [];
const USER_KEY = 'user';


function getUser() {
    return JSON.parse(LocalStorageService.get('user'));
}

function hasRole(user, roleName) {
    if (!user)
        user = getUser();

    if (user == null || user.username == null)
        return false;

    return user.roles && user.roles.findIndex(role => role === roleName) !== -1;
}


function isAdmin(user) {
    return hasRole(user, 'ROLE_ADMIN');
}

function isNotAdmin() {
    return !isAdmin();
}

function isAuthor(user) {
    return hasRole(user, 'ROLE_AUTHOR')
}

function addUserExtraFields(user) {
    user.isAdmin = isAdmin(user);
    user.isAuthor = isAuthor(user);
    return user;
}

function notifyObservers(user) {
    observers.forEach(o => {
        o(user);
    });
}

export const UserService = {

    subscribe(observer, receiveFirstState = true) {
        // no more than one subscription
        if (!observers.includes(observer)) {
            observers.push(observer);
            if (receiveFirstState) {
                const user = JSON.parse(LocalStorageService.get(USER_KEY)) || {};
                addUserExtraFields(user);
                observer(user);
            }
        }
    },

    unsubscribe(observer) {
        const index = observers.indexOf(observer);
        if (index > -1)
            observers.splice(index, 1);
    },

    isAuthenticated() {
        const user = LocalStorageService.get(USER_KEY);
        return !!user;
    },


    saveUser(user) {
        LocalStorageService.set('user', JSON.stringify(user));
        addUserExtraFields(user);
        notifyObservers(user);
    },

    clearSession() {
        LocalStorageService.clear('user');
        notifyObservers({});
    },

    isNotAuthenticated() {
        return !this.isAuthenticated();
    },

    getUser,
};
