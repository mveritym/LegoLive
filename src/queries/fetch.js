import fetch from 'isomorphic-fetch';

export default async function fetchQuery(query) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {'Authorization': 'bearer a50b3f8a62c7b95f89088f553ebf02895065e68e'},
    body: JSON.stringify({query})
  });

  if (response.status >= 400) {
    console.log('HERE');
    throw new Error('Bad response from server');
  }

  return await response.json();
}
