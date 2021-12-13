import React, {useState} from 'react';
import * as PropTypes from "prop-types";
import {Button, Col, Form, Row} from "react-bootstrap";
import Navbar from "../navbar/Navbar";

function For(props) {
    return null;
}

For.propTypes = {children: PropTypes.node};
const Register = () => {
    return (
        <>
            <Navbar/>

            <Form id='login-form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                <Row>
                    <Col>
                        <Form.Control placeholder="First name" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Last name" />
                    </Col>
                </Row>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address </Form.Label>
                    <Form.Control type="email" placeholder="Email will be your username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Street" />
                        </Col>
                    <Col>
                        <Form.Control placeholder="City" />
                    </Col>
                        <Col>
                            <Form.Control placeholder="State" />
                        </Col>
                    </Row>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Register As: </Form.Label>
                    {['checkbox'].map((type) => (
                        <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                inline
                                label="Buyer"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            <Form.Check
                                inline
                                label="Seller"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                            />

                        </div>
                    ))}
                </Form.Group>


                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </>

    );

}

export default Register;