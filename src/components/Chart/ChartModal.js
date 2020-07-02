import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import classes from "./Chart.module.css";

function DisplayChartModal(props) {
  const [show, setShow] = useState(false);
  return (
    <>
      {props.graph}
      <Button
        className={classes.FullScreenButton}
        variant="light"
        onClick={() => setShow(true)}
      >
        Fullscreen
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <div>{props.graph}</div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DisplayChartModal;
