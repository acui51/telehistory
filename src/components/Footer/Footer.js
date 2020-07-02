import React from "react";

const Footer = () => {
  let d = new Date();
  d = d.getFullYear();
  return (
    <footer>
      <small>&copy;{d} Alix Cui </small>
    </footer>
  );
};

export default Footer;
