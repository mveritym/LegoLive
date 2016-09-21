import pullRequestsQuery from '../../src/queries/pullRequests';
import { REPO_ID } from '../../src/constants/tokens';

const stripStr = str => str.replace(/\s+/g, " "); // flattens whitespace in a string

describe('Fetch pull requests', () => {
  it('returns a query to fetch pull requests', () => {
    expect(stripStr(pullRequestsQuery())).toEqual(stripStr(`
      query {
        node(id: "${REPO_ID}") {
          ... on Repository {
            name
            description
            pullRequests(first: 29) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  title
                }
              }
            }
          }
        }
      }
    `));
  });

  it('specifies a cursor', () => {
    const cursor = 'abcd';
    expect(pullRequestsQuery(cursor))
      .toContain(`pullRequests(after: "${cursor}", first: 29)`)
  })

  it('specifies a state', () => {
    const state = 'MERGED';
    expect(pullRequestsQuery(undefined, state))
      .toContain(`pullRequests(first: 29, states: ${state})`)
  });
});
