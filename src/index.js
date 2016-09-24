import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { fetchAll } from './queries/fetch';
import { openPullRequests } from './queries/pullRequests';
import pullRequestsPerAuthor from './transformers/barChart';

async function render() {
  const PRs = await fetchAll('pullRequests', openPullRequests);

  const props = {
    charts: [pullRequestsPerAuthor(PRs)]
  }

  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  );
}

render();
