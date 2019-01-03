import _ from 'lodash';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import createError from 'http-errors';

axiosRetry(axios, { retries: 5 });

export default class ManageApi {
  constructor(baseUri, token) {
    this.baseUri = _.endsWith(baseUri, '/manage') ? baseUri : `${baseUri}/manage`;
    this.token = token;
  }

  async request(method, uri, data = null) {
    const url = `${this.baseUri}/${uri}`;
    const params = {
      method,
      url,
      headers: { 'X-KBC-ManageApiToken': this.token },
      data: data ? JSON.stringify(data) : null,
    };
    try {
      const res = await axios(params);
      return res.data;
    } catch (err) {
      if (_.get(err, 'response.status', null) === 401) {
        throw createError(401, 'Invalid access token');
      }
      const message = _.get(err, 'response.data.error', err.message);
      const code = _.get(err, 'response.status', 0);
      throw createError(
        code,
        `Manage API request ${method} ${url} failed with code ${code} and message: ${message}`
      );
    }
  }

  verifyToken() {
    return this.request('get', 'tokens/verify');
  }

  getOrganization(id) {
    return this.request('get', `organizations/${id}`);
  }

  async createStorageToken(projectId, options = {}) {
    await this.request('post', `projects/${projectId}/tokens`, options);
  }
}
