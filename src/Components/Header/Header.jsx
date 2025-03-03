import React from "react";
import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap";

const Header = ({ onSearch, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="/">
          <img
            src="/logo.png" // Replace with your actual logo path
            alt="Renew Mart"
            height="40"
          />
        </Navbar.Brand>

        {/* Search Bar */}
        <Form className="d-flex mx-auto w-50" onSubmit={(e) => e.preventDefault()}>
          <FormControl
            type="search"
            placeholder="Search products..."
            className="me-2"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        {/* Sell and Logout Buttons */}
        <Nav>
          <Button variant="primary" className="me-2" href="/sell">
            Sell
          </Button>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;

