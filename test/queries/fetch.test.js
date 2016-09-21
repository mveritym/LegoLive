import nock from 'nock';
import fetchQuery from '../../src/queries/fetch';

describe('Fetch queries function', () => {

  it('returns a JSON representation of the data', async () => {
    const response = {data: 'some fake data'};
    nock('https://api.github.com')
      .post('/graphql')
      .reply(200, response);
    const parsedData = await fetchQuery('test');
    expect(parsedData).toEqual(response);
  });

  it('throws an error if the request fails', async () => {
    nock('https://api.github.com')
      .post('/graphql')
      .reply(400);
    fetchQuery('test')
      .catch(e => expect(e).toEqual('Bad response from server'));
  });
});
