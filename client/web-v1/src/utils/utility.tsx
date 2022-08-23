import axios from 'axios';
import useStores from '../hooks/useStores';
import configs from '../configs'

export const fetchTest = async () => {
  const { authStore } = useStores()
  console.log(`${configs.backendEndPoint}/accounts/me`)
  const { data } = await axios.get(`${configs.backendEndPoint}/accounts/me`, {
    params: {  },
    headers: { Authorization: `Bearer ${authStore.getIdToken()}` },
  });

  if (data.error) {
    return null;
  }
  console.log('####', data);

  return data;
};
