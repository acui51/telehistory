import React, { Component } from "react";
import data from "./data/resultFelix.json";
import Chart from "./components/Chart/Chart.jsx";
import logo from "./logo.svg";
import "./App.css";

const CHART_COLORS = ["#003f5c", "#ff6361", "#bc5090", "#58508d", "#ffa600"];

class App extends Component {
  state = {
    users: [],
  };

  // Output set of users
  usersArray = (data) => {
    let users = new Set();
    for (let message of data.messages) {
      if (!users.has(message.from)) {
        users.add(message.from);
      }
    }
    return Array.from(users);
  };

  datesAndFreq = (data, users) => {
    let freqMap = new Map();
    let datesSet = new Set();
    let namesSet = new Set();
    let usersObj = {};
    for (let user of users) {
      usersObj[user] = 0;
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
    }
    return [Array.from(datesSet), freqMap, Array];
  };

  deleteUser = (user) => {
    this.setState();
  };

  render() {
    const users = this.usersArray(data);
    const frequency = this.datesAndFreq(data, users);

    return (
      <div>
        <Chart
          dates={frequency[0]}
          freq={frequency[1]}
          users={users}
          colors={CHART_COLORS}
        />
      </div>
    );
  }
}

export default App;
