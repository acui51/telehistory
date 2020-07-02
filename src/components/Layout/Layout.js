import React from "react";
import Aux from "../../hoc/Aux";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Jumbotron, Button } from "react-bootstrap";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Aux>
      <NavigationBar />
      <Jumbotron className={classes.Jumbotron}>
        <div className={classes.Title}>
          <h1>Explore Your Chat History</h1>
          <p>
            Utilizing exported JSON chat history from the popular messaging app,
            Telegram, we are able to deliver you a representation of that data
            through frequency charts, keyword extraction, and sentiment
            analysis.
          </p>
          <p>
            <AnchorLink href="#text-analysis" className={classes.LearnMore}>
              <Button className={classes.Button} variant="primary">
                Learn more
              </Button>
            </AnchorLink>
          </p>
        </div>
      </Jumbotron>
      <main>{props.children}</main>
      <Footer />
    </Aux>
  );
};

export default Layout;
