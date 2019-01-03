import _ from 'lodash';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import createError from 'http-errors';

axiosRetry(axios, { retries: 5 });

interface CreateStorageTokenOptions {
  description: string,
  canManageBuckets: boolean,
  canManageTokens: boolean,
  canReadAllFileUploads: boolean,
  expiresIn: number,
  bucketPermissions: object
}

export default class Manage {
  private readonly baseUri: string;
  private readonly token: string;

  constructor(baseUri: string, token: string) {
    this.baseUri = baseUri;
    this.token = token;
  }

  async request(method: string, uri: string, data?: object): Promise<object> {
    const url = `${this.baseUri}/v2/storage/${uri}`;
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
        `Storage request ${method} ${url} failed with code ${code} and message: ${message}`
      );
    }
  }

  verifyToken(): Promise<object> {
    return this.request('get', 'tokens/verify');
  }

  getOrganization(id: string): Promise<object> {
    return this.request('get', `organizations/${id}`);
  }

  async createStorageToken(projectId: number, options?: CreateStorageTokenOptions): Promise<void> {
    await this.request('post', `projects/${projectId}/tokens`, options);
  }
}
