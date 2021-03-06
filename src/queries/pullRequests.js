import { REPO_ID } from '../../config/secrets';

export const openPullRequests = (cursor) => pullRequestsQuery(cursor, 'OPEN');

function pullRequestsQuery(cursor, state) {
  const pullRequestParams = [
    {test: cursor, param: `after: "${cursor}"`},
    {test: true, param: `first: 29`},
    {test: state, param: `states: ${state}`}
  ].map(({test, param}) => (test && param) || undefined)
   .filter(param => param)
   .join(', ');

  return `
    query {
      node(id: "${REPO_ID}") {
        ... on Repository {
          name
          description
          pullRequests(${pullRequestParams}) {
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
  `;
}
