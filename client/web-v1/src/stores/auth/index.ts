import { makeAutoObservable } from 'mobx';
import { Auth } from 'aws-amplify';

const authStore = function createAuthStore() {
  return makeAutoObservable({
    idToken: '',
    accessToken: '',
    name: '',
    updateToken(idToken?: string, accessToken?: string, name?: string): void {
      this.idToken = idToken || this.idToken;
      this.accessToken = accessToken || this.accessToken;
      this.name = name || this.name;
    },
    removeToken(): void {
      this.idToken = '';
      this.accessToken = '';
      this.name = '';
    },
    getIdToken(): void {
      Auth.currentAuthenticatedUser().then((user) => {
        const idToken = user.signInUserSession.idToken.jwtToken;
        if (idToken === this.idToken) return idToken;
        const accessToken = user.signInUserSession.accessToken.jwtToken;
        const name = user.attributes.nickname;

        this.updateToken(idToken, accessToken, name);
        return idToken;
      });
    },
    async signOut(): Promise<void> {
      await Auth.signOut();
      this.removeToken();
    },
  });
};

export default authStore;
