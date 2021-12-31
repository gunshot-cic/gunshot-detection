import React from "react";
import { Navbar } from "react-bootstrap";
import styled from "styled-components";
const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9fffcb;
    &:hover {
      color: white;
    }
  }
`;
const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand>Gunshot Detection</Navbar.Brand>
    </Navbar>
  </Styles>
);

export default NavigationBar;
