import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import classes from "./Keyword.module.css";
import sampleData from "./keywordObj";
import ChartModal from "../Chart/ChartModal.js";
import { FaKey } from "react-icons/fa";
import apiKey from "../../mock/insert_api";
const MonkeyLearn = require("monkeylearn");

export default class KeywordChart extends Component {
  state = {
    loading: true,
    keyword: null, // holds array of the data from MonkeyLeaner API
  };

  // Make API request, and update keyword state to be an array of data
  async componentDidMount() {
    let keywordObject = [];
    const ml = new MonkeyLearn(apiKey);
    if (ml.api_key === "") {
      this.setState({ keyword: sampleData, loading: false });
    } else {
      let model_id = "ex_YCya9nrn";
      for (let user of Array.from(this.props.users)) {
        let data = this.props.messages[user];
        data[0] = data[0].substring(0, 50000);
        ml.extractors.extract(model_id, data).then((res) => {
          keywordObject.push(res.body);
          this.setState({ keyword: keywordObject, loading: false });
        });
      }
    }
  }

  render() {
    if (
      !this.state.keyword ||
      this.state.keyword.length !== this.props.users.length
    ) {
      return (
        <div>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    }
    // ChartJS - defining the data to be used in the code
    const data = {
      labels: this.state.keyword[0][0].extractions.map((elem, index) => {
        return index + 1;
      }),
      datasets: this.props.users.map((user, index) => {
        let label = user;
        let colorIndex = index % this.props.colors.length;
        let backgroundColor = this.props.colors[colorIndex];
        let data = this.state.keyword[index][0].extractions.map(
          (keyword, keywordIndex) => {
            label += ` ${keywordIndex + 1}."${keyword.parsed_value}" `;
            return keyword.relevance;
          }
        );
        return {
          label: label,
          data: data,
          backgroundColor: backgroundColor,
        };
      }),
    };

    // ChartJS - defining the graph to be rendered
    let graph = (
      <Bar
        width={600}
        height={300}
        data={data}
        options={{
          title: {
            display: true,
            text: "Message Keywords",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Relevance",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Keyword Phrase",
                },
              },
            ],
          },
        }}
      />
    );

    return (
      <div id="keyword">
        <div className={classes.Chart}>
          <div className={classes.ChartModal}>
            <ChartModal graph={graph} />
          </div>
          <div className={classes.ChartDesc}>
            <h1 style={{ color: "#58508d" }}>
              Keywords <FaKey />
            </h1>
            <p>
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
        </div>
      </div>
    );
  }
}
