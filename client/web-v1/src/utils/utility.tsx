import axios from 'axios';
import {Auth} from "aws-amplify";


export const fetchTest = async () => {
  const user = await Auth.currentAuthenticatedUser();
  console.log(user.signInUserSession.idToken.jwtToken)
  const { data } = await axios.get(`http://localhost:8000/accounts/me`, {
    params: {  },
    headers: { Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}` },
  });

  if (data.error) {
    return null;
  }
  console.log('####', data);

  return data;
};
