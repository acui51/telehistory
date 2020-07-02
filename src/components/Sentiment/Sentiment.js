import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import classes from "./Sentiment.module.css";
import { Spinner } from "react-bootstrap";
import ChartModal from "../Chart/ChartModal";
import { FaSmile } from "react-icons/fa";
import sampleData from "./sentimentObj";
import apiKey from "../../mock/insert_api";

const MonkeyLearn = require("monkeylearn");

const HEIGHT = 300;

export default class SentimentChart extends Component {
  state = {
    loading: true,
    sentiment: null,
  };

  async componentDidMount() {
    let sentimentObject = [];
    const ml = new MonkeyLearn(apiKey);
    if (ml.api_key === "") {
      this.setState({ sentiment: sampleData, loading: false });
    }
    let model_id = "cl_pi3C7JiL";
    for (let user of Array.from(this.props.users)) {
      let data = this.props.messages[user];
      data[0] = data[0].substring(0, 50000);
      ml.classifiers.classify(model_id, data).then((res) => {
        console.log(res.body);
        sentimentObject.push(res.body);
        this.setState({ sentiment: sentimentObject, loading: false });
      });
    }
  }

  sentimentGraphs = () => {
    let graphArray = [];
    let sentimentObject = this.state.sentiment;
    for (let i = 0; i < this.props.users.length; i++) {
      let data = {
        labels: [
          sentimentObject[i][0].classifications[0]["tag_name"] + " Certainty",
          "Uncertainty",
        ],
        datasets: [
          {
            data: [
              sentimentObject[i][0].classifications[0]["confidence"],
              1 - sentimentObject[i][0].classifications[0]["confidence"],
            ],
            backgroundColor: [this.props.colors[i], "#d6d6d6"],
          },
        ],
      };

      let graph = (
        <Pie
          height={HEIGHT / this.props.users.length}
          data={data}
          options={{
            title: {
              display: true,
              text: this.props.users[i],
              fontSize: 30,
            },
            legend: {
              display: true,
            },
          }}
        />
      );
      graphArray.push(graph);
    }
    return graphArray;
  };

  render() {
    if (
      !this.state.sentiment ||
      this.state.sentiment.length !== this.props.users.length
    ) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    }
    let graphs = this.sentimentGraphs();
    let chartModals = [];
    for (let graph of graphs) {
      chartModals.push(<ChartModal graph={graph} />);
    }

    return (
      <div id="sentiment">
        <div className={classes.Chart}>
          <div className={classes.ChartDesc}>
            <h1 style={{ color: "#ffa600" }}>
              <FaSmile /> Sentiment
            </h1>
            <p>
              {" "}
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
          </div>
          <div className={classes.ChartModal}> {chartModals}</div>
        </div>
      </div>
    );
  }
}
