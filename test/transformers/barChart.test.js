import pullRequestsPerAuthor from '../../src/transformers/barChart';

describe('Bar chart transformer', () => {
  it('should turn a list of PRs into a bar chart data obj', () => {
    const PRs = [{
      author: {
        login: 'mveritym'
      },
      title: 'First pull request'
    }, {
      author: {
        login: 'asavin'
      },
      title: 'Translation change'
    }, {
      author: {
        login: 'mveritym'
      },
      title: 'Another pull request'
    }];

    expect(pullRequestsPerAuthor(PRs)).toEqual({
      type: 'Bar',
      data: {
        labels: ['mveritym', 'asavin'],
        datasets: [{
          data: [2, 1]
        }]
      }
    });
  });
});
