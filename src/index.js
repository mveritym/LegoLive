import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import fetch from './queries/fetch';
import pullRequests from './queries/pullRequests';
import pullRequestsPerAuthor from './transformers/barChart';

async function render() {
  let PRs = await fetch(pullRequests(undefined, 'OPEN'));

  const props = {
    charts: [pullRequestsPerAuthor(PRs)]
  }

  ReactDOM.render(
    <App {...props} />,
    document.getElementById('root')
  );
}

render();
