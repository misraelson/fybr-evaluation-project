import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GradientDarkgreenGreen } from '@vx/gradient';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {
  state = {
    width: 0,
    height: 0,
    chartData: {
      labels: [],
      datasets:[
        {
          data:[],
          backgroundColor: '',
        }
      ],
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.setSize);

    this.setSize();
    this.setTreeSize();
  }

  setSize = (event) => {
    const { width, height } = this.chart.getBoundingClientRect();

    this.setState((prevState) => {
      return {
        width,
        height
      };
    });
  }

  setRef = (node) => {
    this.chart = node;
  }

  setTreeSize = () => {
    // map through TREES and seperate into groups according to height
    const allTrees = {...this.props.trees};
    const oneTen = []
    const tenTwenty = []
    const twentyThirty = []
    const thirtyForty = []
    const fortyFifty = []
    const fiftySixty = []
    const sixtySeventy = []
    Object.keys(allTrees).map( (key) => {
      // console.log(allTrees[key].height);
      let treeHeight = allTrees[key].height
      if(treeHeight < 10) {
        oneTen.push(treeHeight)
      }
      if(20 > treeHeight && treeHeight > 10) {
        tenTwenty.push(treeHeight)
      }
      if(30 > treeHeight && treeHeight > 20) {
        twentyThirty.push(treeHeight)
      }
      if(40 > treeHeight && treeHeight > 30) {
        thirtyForty.push(treeHeight)
      }
      if(50 > treeHeight && treeHeight > 40) {
        fortyFifty.push(treeHeight)
      }
      if(60 > treeHeight && treeHeight > 50) {
        fiftySixty.push(treeHeight)
      }
      if(70 > treeHeight && treeHeight > 60) {
        sixtySeventy.push(treeHeight)
      }
    });
    let dataSet = {...this.state.chartData.datasets}
    let newData = dataSet[0].data
    newData = [
      oneTen.length,
      tenTwenty.length,
      twentyThirty.length,
      thirtyForty.length,
      fortyFifty.length,
      fiftySixty.length,
      sixtySeventy.length,
    ];
    let labels = ['0m - 10m', '10m - 20m', '20m - 30m', '30m - 40m', '40m - 50m', '50m - 60m', '60m - 70m',];
    let backgroundColor = 'rgba(49, 211, 177, 0.8)'
    this.setState({
      chartData: {
        labels: labels,
        datasets:[
          {
            data: newData,
            backgroundColor: backgroundColor,
          }
        ],
      }
    })
  }

  render() {
    const { width, height } = this.state;

    /* This is a hack to first set the size based on percentage
       then query for the size so the chart can be scaled to the window size.
       The second render is caused by componentDidMount(). */
    if(width < 100 || height < 100) {
      return <svg ref={ this.setRef } width={'100%'} height={'100%'}></svg>
    }

    return (
      <div className='bar-chart'>
        <Bar
          data={this.state.chartData}
          width={width}
          height={height}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            legend:{
              display:false,
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
            },
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trees: state.trees.byId,
  };
}

export default connect(mapStateToProps)(Chart);;
