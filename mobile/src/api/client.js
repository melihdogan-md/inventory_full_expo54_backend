import axios from 'axios';
import Constants from 'expo-constants';

const apiBaseUrl =
  Constants.expoConfig?.extra?.apiBaseUrl ||
  Constants.manifest2?.extra?.apiBaseUrl ||
  'http://192.168.1.19:5000';

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};
