import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('App container', () => {

  const props = {
    charts: [{
      type: 'Bar',
      data: {
        labels: ['a', 'b', 'c'],
        datasets: [{
          data: [1, 2, 3],
        }]
      }
    }]
  };

  it('renders a bar chart', () => {
    const app = shallow(<App {...props} />);
    const chart = app.find('BarChart');
    expect(chart.length).toBe(1);
    expect(chart.props().data).toBe(props.charts[0].data);
  });
});
