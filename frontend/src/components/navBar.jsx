import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter as Router, Switch, Route, NavLink} from "react-router-dom";

class navBar extends Component {

    render() {
        return(
            <Container fluid>
                <Navbar variant="dark" sticky='right' className='mb-5 mt-2'>
                    <Container fluid>
                    <Nav className="ms-auto">
                        <Nav.Link as = {NavLink} className="me-3 navlink" to = {"/search"}>Search</Nav.Link>
                        <Nav.Link as = {NavLink} className ="navlink" to = {"/favorites"}>Favorites</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </Container>
        );
    };


}

export default navBar;