import React from "react";
import { Container, Navbar } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-top">
      <Container>
        <Navbar.Brand href="/">Cookbook</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
