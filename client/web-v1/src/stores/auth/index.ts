import { makeAutoObservable } from 'mobx';
import { Auth } from 'aws-amplify';
import configs from '../../configs';
import axios from 'axios';

const authStore = function createAuthStore() {
  return makeAutoObservable({
    idToken: '',
    accessToken: '',
    name: '',

    async fetchTest(): Promise<void> {
      const getIdToken = await this.getIdToken();
      const { data } = await axios.get(`${configs.backendEndPoint}/accounts/me`, {
        params: {},
        headers: { Authorization: `Bearer ${getIdToken}` },
      });

      if (data.error) {
        return null;
      }
      return data;
    },

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
    async getIdToken(): Promise<string> {
      const user = await Auth.currentAuthenticatedUser();

      const idToken = user.signInUserSession.idToken.jwtToken;
      if (idToken === this.idToken) {
        return idToken;
      }
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const name = user.attributes.nickname;

      await this.updateToken(idToken, accessToken, name);
      return idToken;
    },
    async signOut(): Promise<void> {
      await Auth.signOut();
      this.removeToken();
    },
  });
};

export default authStore;
