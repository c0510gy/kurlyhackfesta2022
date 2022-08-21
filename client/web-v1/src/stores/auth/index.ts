import { makeAutoObservable } from 'mobx'

const authStore = function createAuthStore(idToken?: string, accessToken?: string, name?: string) {
    return makeAutoObservable({
        idToken,
        accessToken,
        name,
        updateAuth(newIdToken?: string, newAccessToken?: string, newName?: string) {
            idToken = newIdToken || idToken;
            accessToken = newAccessToken || accessToken;
            name = newName || name;
        }
    })
}

export default authStore;