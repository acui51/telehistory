import React, { Component } from "react";
import data from "../../data/sample.json";
import Chart from "../../components/Chart/Chart";
import Aux from "../../hoc/Aux";
import KeywordChart from "../../components/KeywordChart/Keyword";
import SentimentChart from "../../components/Sentiment/Sentiment";

const CHART_COLORS = ["#003f5c", "#ff6361", "#bc5090", "#58508d", "#ffa600"];
const KEYWORD_COLORS = ["#58508d", "#ffa600", "#003f5c", "#ff6361", "#bc5090"];
const SENTIMENT_COLORS = [
  "#ffa600",
  "#003f5c",
  "#ff6361",
  "#bc5090",
  "#58508d",
];

class ChartBuilder extends Component {
  state = {
    users: [],
    type: "line",
  };

  // Output array of users
  usersArray = (data) => {
    let users = new Set();
    for (let message of data.messages) {
      if (!users.has(message.from)) {
        users.add(message.from);
      }
    }
    return Array.from(users).filter((user) => user !== undefined);
  };

  /**
   * Outputs an objec with dates for the chart labels, and frequency object
   * for the actual data
   */
  datesAndFreq = (data, users) => {
    let freqMap = new Map();
    let messageMap = new Map();
    let datesSet = new Set();
    let usersObj = {};
    for (let user of users) {
      usersObj[user] = 0;
      messageMap[user] = [""];
    }

    for (let message of data.messages) {
      // ex. fullDate = '6/20'
      let date = new Date(message.date);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let fullDate = month + "/" + day;
      if (!datesSet.has(fullDate)) {
        datesSet.add(fullDate);
      }

      if (!freqMap.has(fullDate)) {
        freqMap.set(fullDate, { ...usersObj });
      }
      let userMessage = message.from;
      let freqObj = freqMap.get(fullDate);
      freqObj[userMessage]++;

      if (typeof message.text === "string") {
        // If messenger is undefined, skip that
        if (messageMap[message.from] === undefined) {
          continue;
        }
        messageMap[message.from][0] += message.text + " ";
      }
    }
    return [Array.from(datesSet), freqMap, messageMap];
  };

  render() {
    const users = this.usersArray(data);
    const frequency = this.datesAndFreq(data, users);

    return (
      <Aux>
        <Chart
          dates={frequency[0]}
          freq={frequency[1]}
          users={users}
          colors={CHART_COLORS}
        />
        <KeywordChart
          users={users}
          messages={frequency[2]}
          colors={KEYWORD_COLORS}
        />
        <SentimentChart
          users={users}
          colors={SENTIMENT_COLORS}
          messages={frequency[2]}
        />
      </Aux>
    );
  }
}

export default ChartBuilder;
