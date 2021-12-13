import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import './login.css';
import {Button, Form} from "react-bootstrap";
import Navbar from "../navbar/Navbar";
import axios from "axios";


const Login = () => {

    //default value
    const[user,setUser] = useState({username:'',password:''});
    // const dispatch = useDispatch();
    const navigate= useNavigate();


    const onChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const login=()=>{
        axios.post("http://localhost:8080/authenticate",user)
            .then(res=>{
                if(res.status===200){
                    // dispatch(saveToken(res.data));
                    navigate('/dashboard');
                }
                else{
                    alert('oppsie');
                }
            }).catch(e=>alert('You shall not pass!! Unauthorized access'));

    }
    return (
        <>
            <Navbar/>

            <Form id='login-form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>onChange(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </>

    );
};

export default Login;