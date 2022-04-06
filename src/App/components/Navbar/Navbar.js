import React, { useState } from "react";
// import PropTypes from "prop-types";
import style from "./Navbar.module.scss";
import { Navbar as NavBar, Nav, Container } from "react-bootstrap";
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
// const initialState = {};
import { LinkContainer } from "react-router-bootstrap";
const Navbar = (props) => {
  // const [state, setstate] = useState(initialState);
  return (
    <div className={style.Navbar} data-testid="Navbar">
      <NavBar bg="primary" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>Home</NavBar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/thumbnail">
              <Nav.Link>Thumbnail</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/editor">
              <Nav.Link>New meme</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/listPDF">
              <Nav.Link>liste des memes en pdf</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </NavBar>
    </div>
  );
};
Navbar.propTypes = {};
Navbar.defaultProps = {};

export default Navbar;
