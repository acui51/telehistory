import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { FaTelegramPlane } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";
import classes from "./NavigationBar.module.css";

const navigationBar = () => {
  return (
    <div>
      <Navbar expand="lg" className={classes.Navbar}>
        <Navbar.Brand href="/">
          <FaTelegramPlane style={{ marginRight: "5", marginBottom: "5" }} />
          Telehistory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <AnchorLink href="#text-analysis" className={classes.Anchor}>
                Frequency
              </AnchorLink>
            </Nav.Link>
            <Nav.Link>
              <AnchorLink href="#keyword" className={classes.Anchor}>
                Keywords
              </AnchorLink>
            </Nav.Link>
            <Nav.Link>
              <AnchorLink href="#sentiment" className={classes.Anchor}>
                Sentiment
              </AnchorLink>
            </Nav.Link>
            <Nav.Link
              className={classes.RightPush}
              href="https://github.com/acui51"
            >
              <FaGithub size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navigationBar;
