const barChartFromData = (labels, barData) => ({
  type: 'Bar',
  data: {
    labels,
    datasets: [{
      data: barData
    }]
  }
});

export default function pullRequestsPerAuthor(pullRequestList) {
  const authors = [];
  const numPRs = [];

  pullRequestList.data.node.pullRequests.edges.forEach(edge => {
    const author = edge.node.author.login;
    if (authors.includes(author)) {
      numPRs[authors.indexOf(author)] +=1;
    } else {
      authors.push(author);
      numPRs.push(1);
    }
  });

  return barChartFromData(authors, numPRs);
}
