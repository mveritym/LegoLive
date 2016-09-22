import { openPullRequests } from '../../src/queries/pullRequests';
import { REPO_ID } from '../../config/secrets';

const stripStr = str => str.replace(/\s+/g, " "); // flattens whitespace in a string

describe('Fetch pull requests', () => {
  it('returns a query to fetch pull requests', () => {
    expect(stripStr(openPullRequests())).toEqual(stripStr(`
      query {
        node(id: "${REPO_ID}") {
          ... on Repository {
            name
            description
            pullRequests(first: 29, states: OPEN) {
              pageInfo {
                hasNextPage
                endCursor
              }
              edges {
                node {
                  title
                  author {
                    login
                  }
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
    expect(openPullRequests(cursor))
      .toContain(`pullRequests(after: "${cursor}", first: 29, states: OPEN)`)
  })
});
