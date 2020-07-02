import React, { Component } from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import ChartModal from "./ChartModal";
import GraphToggle from "../../components/GraphToggle/GraphToggle";
import { FaWaveSquare } from "react-icons/fa";

class Chart extends Component {
  state = {
    type: "line",
  };

  data = {
    labels: this.props.dates,
    datasets: this.props.users.map((user, index) => {
      let label = user;
      let colorIndex = index % this.props.colors.length;
      let borderColor = this.props.colors[colorIndex];
      let data = Array.from(this.props.freq).map((date) => date[1][user]);
      return {
        label: label,
        data: data,
        borderColor: borderColor,
        backgroundColor: borderColor,
        fill: false,
        lineTension: 0.1,
        borderCapStyle: "butt",
      };
    }),
  };

  lineGraph = (
    <Line
      width={600}
      height={300}
      data={this.data}
      options={{
        title: {
          display: true,
          text: "Message Frequency",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "bottom",
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Messages",
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
            },
          ],
        },
      }}
    />
  );

  barGraph = (
    <Bar
      data={this.data}
      options={{
        title: {
          display: true,
          text: "Message Frequency",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "bottom",
        },
      }}
    />
  );

  // onClick handler for selecting a certain graph representation
  graphHandler = (type) => {
    this.setState({ type: type });
  };

  render() {
    return (
      <div id="text-analysis" className={styles.Chart}>
        <div className={styles.ChartDesc}>
          <h1 style={{ color: "#ff6361" }}>
            <FaWaveSquare /> Frequency
          </h1>
          <p>
            {" "}
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum."
          </p>
          <GraphToggle
            selectedOption={this.state.type}
            graphHandler={this.graphHandler}
          />
        </div>
        <div className={styles.ChartModal}>
          <ChartModal
            className={styles.ChartModal}
            graph={this.state.type === "line" ? this.lineGraph : this.barGraph}
          />
        </div>
      </div>
    );
  }
}

// {this.props.type === "line" ? this.lineGraph : this.barGraph}

export default Chart;
