import vars from '../config/env.config';

/**
 * This class contain base behavior and data for all HTTP requests
 */

class BaseAPIs {
  baseUrl: string;

  constructor() {
    this.baseUrl = vars.get('backendBaseUrl');
  }
}

export default BaseAPIs;
