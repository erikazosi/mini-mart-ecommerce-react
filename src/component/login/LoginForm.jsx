import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import './style.css';
import {Button, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";

import {saveToken} from "../../redux/AuthenticateReducer";
import {SERVER_LOC} from "../../constant/Data";
import axios from "axios";

const LoginForm = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const onFinish = (values) => {
        let userD = {username: values.username, password: values.password};
        login(userD);
    };

    const login =(user)=>{
        axios.post(SERVER_LOC + "/auth",user)
            .then(res =>{
                if(res.status===200){
                    dispatch(saveToken(res.data));
                    navigate('/');
                }
            })
            .catch((error) => {
                if(error.response !== undefined){
                    // Error
                    switch (error.response.status) {
                        case 403:
                            message.error( "Username or password is not correct.");
                        default:
                            break;
                    }
                }

            });
    };

    return (
        <>
            <h1 style={{textAlign:'center'}}>Login</h1>
            <p style={{textAlign:'center'}}>Admin / Seller / Login Login</p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder="Username"  />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
                        Log in
                    </Button>
                    Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
        </>
    );
}

export default LoginForm;