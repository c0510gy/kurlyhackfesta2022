import { makeAutoObservable } from 'mobx'

const authStore = function createAuthStore() {
    return makeAutoObservable({
        idToken: "",
        accessToken: "",
        name: "",
        updateToken: (id: string) => {
            this.idToken = id
        }
    });
};

export default authStore;