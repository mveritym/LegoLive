import pullRequestsPerAuthor from '../../src/transformers/barChart';

describe('Bar chart transformer', () => {
  it('should turn a PR into a bar chart data obj', () => {
    const PR = {
      data: {
        node: {
          description: 'Grocery UI',
          name: 'grocery',
          pullRequests: {
            edges: [{
              node: {
                author: {
                  login: 'mveritym'
                },
                title: 'First pull request'
              }
            }, {
              node: {
                author: {
                  login: 'asavin'
                },
                title: 'Translation change'
              }
            }, {
              node: {
                author: {
                  login: 'mveritym'
                },
                title: 'Another pull request'
              }
            }]
          }
        }
      }
    };

    expect(pullRequestsPerAuthor(PR)).toEqual({
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
