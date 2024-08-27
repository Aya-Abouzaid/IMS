/* eslint-disable class-methods-use-this */
import axios from 'axios';

/**
 * This method to set auth header for each HTTP request
 */
const setAuthHeader = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthHeader;
