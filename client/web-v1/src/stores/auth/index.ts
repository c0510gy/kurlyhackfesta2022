import { makeAutoObservable } from 'mobx'

const authStore = function createAuthStore() {
    return makeAutoObservable({
        idToken: String,
        accessToken: String,
        name: String,
        updateToken(idToken?: String, accessToken?: String, name?: String):void {
            this.idToken = idToken || this.idToken;
            this.accessToken = accessToken || this.accessToken;
            this.name = name || this.name;
        }
    });
};

export default authStore;