import axios from 'axios';
import useStores from '../hooks/useStores';

export const fetchTest = async () => {
  const { authStore } = useStores()

  const { data } = await axios.get(`http://localhost:8000/accounts/me`, {
    params: {  },
    headers: { Authorization: `Bearer ${authStore.getIdToken()}` },
  });

  if (data.error) {
    return null;
  }
  console.log('####', data);

  return data;
};
