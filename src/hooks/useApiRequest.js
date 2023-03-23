import {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

function useApiRequest() {
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({status: null, value: false, e: null});

  const callEnpoint = async request => {
    let response = null;
    setSource(request.source);
    resetError();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable === false) {
        setLoading(false);
        request.source.cancel('Operation canceled by the user.');
      }
    });

    const timeout = setTimeout(() => {
      setLoading(false);
      request.source.cancel('Operation canceled by the user.');
    }, 60000 * 3);

    resetError();
    setLoading(true);
    try {
      const responseServer = await request.call;
      response = responseServer.data;
      clearTimeout(timeout);
      unsubscribe();
    } catch (e) {
      setError({status: e?.response?.status || -1, value: true, e: e});
      clearTimeout(timeout);
      unsubscribe();
    }

    setLoading(false);
    return response;
  };

  const resetError = () => {
    setError({status: null, value: false, e: null});
  };

  const cancelEnpoint = () => {
    setLoading(false);
    source.cancel('Operation canceled by the user.');
  };

  return {loading, error, callEnpoint, cancelEnpoint, resetError};
}

export default useApiRequest;
