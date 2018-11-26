import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GradientDarkgreenGreen } from '@vx/gradient';
import {Bar} from 'react-chartjs-2';

class Chart extends Component {
  state = {
    width: 0,
    height: 0,
    chartData: {
      labels: ['0m - 10m', '10m - 20m', '20m - 30m', '30m - 40m', '40m - 50m', '50m - 60m', '60m - 70m',],
      datasets:[
        {
          data:[
            5,
            20,
            30,
            40,
            50,
            30,
            20
          ],
          backgroundColor: 'rgba(49, 211, 177, 0.8)',
        }
      ],
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.setSize);

    this.setSize();
    this.getTreeSize();
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

  getTreeSize = () => {
    // map through TREES and seperate into groups accroding to height
    const allTrees = {...this.props.trees};
    Object.keys(allTrees).map( (key, index) => {
      console.log(allTrees[key].height);
    });
    // this.setState( (prevState) => {
    //   chartData: {datasets:[{data:[
    //     // new data
    //   ]}]}
    // })
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
      {/* <svg ref={ this.setRef } width={'100%'} height={'100%'}>
        <GradientDarkgreenGreen id="gradient" />
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={`url(#gradient)`}
        />

      </svg> */}
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
