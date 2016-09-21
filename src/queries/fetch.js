import fetch from 'isomorphic-fetch';
import { GITHUB_TOKEN } from '../constants/tokens';

export default async function fetchQuery(query) {
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
