import React, { Component } from "react";
import { Bar, Line, Pie, Scatter } from "react-chartjs-2";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: props.dates,
        datasets: props.users.map((user, index) => {
          let label = user;
          let colorIndex = index % props.colors.length;
          let borderColor = props.colors[colorIndex];
          let data = Array.from(props.freq).map((date) => date[1][user]);
          return {
            label: label,
            data: data,
            borderColor: borderColor,
            fill: false,
          };
        }),
      },
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
  };

  render() {
    return (
      <div>
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Message Frequency",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
              onClick: (event) => {
                console.log(event.target);
              },
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
