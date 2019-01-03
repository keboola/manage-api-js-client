import ManageApi from '../ManageApi';

describe('ManageApi', () => {
  const manageApi = new ManageApi(process.env.KBC_URL, process.env.KBC_TOKEN);

  it('request', async () => {
    const res = await manageApi.request('get', 'tokens/verify');
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('isExpired');
    expect(res).toHaveProperty('user');
    expect(res.isExpired).toBeFalsy();
  });

  it('verifyToken', async () => {
    const res = await manageApi.verifyToken();
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('isExpired');
    expect(res).toHaveProperty('user');
    expect(res.isExpired).toBeFalsy();
  });
});
