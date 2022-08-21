import { useContext } from 'react';
import { StoresContext } from '../contexts/store';

const useStores = function getStoreValueByContext() {
  return useContext(StoresContext);
};

export default useStores;
