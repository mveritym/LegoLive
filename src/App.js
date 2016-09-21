import React, { Component } from 'react';
import charts from 'react-chartjs';
import logo from './logo.svg';
import './App.css';

const chartTypes = {
  'Bar': charts.Bar
}

class App extends Component {

  chartComponents = this.props.charts && this.props.charts.map((chart, index) => {
    const Chart = chartTypes[chart.type];
    return <Chart key={index} data={chart.data} />
  });

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {this.chartComponents}
        </p>
      </div>
    );
  }
}

export default App;
