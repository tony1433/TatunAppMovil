import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

//Global
axios.defaults.baseURL = 'http://192.168.1.9:3000';

//Method GET
export async function axiosGet(enpoint) {
  return new Promise(resolve => {
    const source = axios.CancelToken.source();

    const unsubscribe = NetInfo.addEventListener(s => {
      if (!s.isInternetReachable) {
        source.cancel('Operation canceled by the user.');
      }
    });

    const timeout = setTimeout(() => {
      source.cancel();
    }, 60000 * 5);

    axios
      .get(enpoint, {headers: '', cancelToken: source.token})
      .then(response => {
        unsubscribe();
        clearTimeout(timeout);
        if (response.status >= 200 || response.status <= 299) {
          resolve({value: response.data, status: response.status});
        }
      })
      .catch(e => {
        unsubscribe();
        clearTimeout(timeout);
        try {
          resolve({value: [], status: e.response.status});
        } catch (error) {
          resolve({value: [], status: -1});
        }
      });
  });
}

//Method POST
export async function axiosPost(endpoint, params) {
  return new Promise(resolve => {
    const source = axios.CancelToken.source();

    const unsubscribe = NetInfo.addEventListener(s => {
      if (!s.isInternetReachable) {
        source.cancel('Operation canceled by the user.');
      }
    });

    const timeout = setTimeout(() => {
      source.cancel();
    }, 60000 * 5);

    //axios
    axios
      .post(endpoint, params, {headers: '', cancelToken: source.token})
      .then(response => {
        unsubscribe();
        clearTimeout(timeout);
        if (response.status >= 200 || response.status <= 299) {
          resolve({value: response.data, status: response.status});
        }
      })
      .catch(e => {
        unsubscribe();
        clearTimeout(timeout);
        try {
          resolve({value: [], status: e.response.status});
        } catch (error) {
          resolve({value: [], status: -1});
        }
      });
  });
}
