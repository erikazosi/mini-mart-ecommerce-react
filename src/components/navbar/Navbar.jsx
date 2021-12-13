import React from 'react';
import {Nav} from "react-bootstrap";

const Navbar=() =>{

        return (
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/login" href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/register" href="/register">Register</Nav.Link>
                </Nav.Item>

            </Nav>
        );
    }
export default Navbar;