import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryAxis,
  VictoryLegend,
} from 'victory';
import {
  loadMetricsRequest,
} from './redux/modules/charts/reducer';
import moment from 'moment';

class App extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      charts: {
        watino: nextProps.charts.watino,
        weka: nextProps.charts.weka,
      },
    };
  }

  state = {
    charts: {
      watino: [],
      weka: [],
    },
    day: moment().subtract(1, 'days'),
  };

  componentDidMount() {
    this.props.loadMetricsRequest(this.state.day);
  }

  render() {
    return (
      <div className="App">
        <VictoryChart domainPadding={{x: 10}}
                      height={200}
        >
          <VictoryLegend x={40} y={170}
                         centerTitle
                         orientation='vertical'
                         gutter={20}
                         style={{
                           labels: {fontSize: 5},
                         }}
                         data={[
                           {
                             name: 'Watino',
                             symbol: {fill: '#a52191', opacity: 0.5},
                           },
                           {
                             name: 'Weka',
                             symbol: {fill: '#03a863', opacity: 0.5},
                           },
                         ]}/>
          <VictoryAxis dependentAxis
                       style={{
                         tickLabels: {fontSize: 5, padding: 5},
                         grid: {stroke: '#ccc'},
                       }}/>
          <VictoryAxis offsetX={10}
                       style={{
                         tickLabels: {fontSize: 5, padding: 5},
                         grid: {stroke: '#ccc'},
                       }}/>
          <VictoryGroup offset={4}
                        colorScale={'qualitative'}
                        categories={{x: this.getCategories()}}
          >
            <VictoryBar
              data={this.getChartValues(this.state.charts.watino)}
              style={{
                data: {fill: '#a52191', opacity: 0.5},
              }}
            />
            <VictoryBar
              data={this.getChartValues(this.state.charts.weka)}
              style={{
                data: {fill: '#03a863', opacity: 0.5},
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }

  getChartValues(data) {
    return data.map((metric, index) => ({
      x: moment(metric.date).format('H'),
      y: parseInt(metric.value, 10),
    })).filter((e, i) => i < 24);
  }

  getCategories() {
    return this.state.charts.watino.map(
      metric => moment(metric.date).format('HH:mm'));
  }
}

const mapStateToProps = (state) => ({
  error: state.charts.error,
  charts: state.charts.entities.charts,
});

const mapDispatchToProps = {
  loadMetricsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
