import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import ChartBuilder from "./containers/ChartBuilder/ChartBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ChartBuilder></ChartBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
