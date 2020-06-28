import React from "react";
import Aux from "../../../hoc/Aux";

const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar</div>
      <main>{props.children}</main>
    </Aux>
  );
};
