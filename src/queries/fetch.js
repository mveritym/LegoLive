import fetch from 'isomorphic-fetch';
import { GITHUB_TOKEN } from '../constants/tokens';

async function fetchQuery(query) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {'Authorization': `bearer ${GITHUB_TOKEN}`},
    body: JSON.stringify({query})
  });

  if (response.status >= 400) {
    throw new Error('Bad response from server');
  }

  return await response.json();
}

export async function fetchAll(connectionType, getQuery) {

  const connectionObj = await fetchQuery(getQuery(undefined));
  let cursor = connectionObj.data.node[connectionType].pageInfo.endCursor;

  async function recursiveFetch() {
    const newConnectionObj = await fetchQuery(getQuery(cursor));
    const {pageInfo, edges} = newConnectionObj.data.node[connectionType];

    const newEdges = connectionObj.data.node[connectionType].edges.concat(edges);
    connectionObj.data.node[connectionType].edges = newEdges;

    if(pageInfo.hasNextPage) {
      cursor = pageInfo.endCursor;
      return recursiveFetch();
    } else {
      return connectionObj;
    }
  }

  return await recursiveFetch();
}
