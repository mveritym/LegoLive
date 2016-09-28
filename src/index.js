import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Cache from './utils/cache';
import { fetchAll } from './queries/fetch';
import { openPullRequests } from './queries/pullRequests';
import pullRequestsPerAuthor from './transformers/barChart';

async function render() {
  const cache = new Cache(5000); // 3600000
  cache.init();
  const PRs = await fetchAll('pullRequests', openPullRequests, cache);

  const props = {
    charts: [pullRequestsPerAuthor(PRs)]
  }

  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  );
}

render();
