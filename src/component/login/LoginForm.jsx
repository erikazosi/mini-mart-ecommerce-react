import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './style.css';
import {Button, Checkbox, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import axios from "axios";

import {saveToken} from "../../redux/AuthenticateReducer";

const LoginForm = () => {
    const [user,setUser] = useState({username:'',password:''});
    const dispatch= useDispatch();
    const navigate= useNavigate();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
     // console.log(values.username + " " + values.password);
        let userD = {username: values.username, password: values.password};
        setUser(userD);
        console.log(userD)
        login(userD);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const login =(user)=>{
        console.log(user);
        axios.post("http://localhost:8080/auth",user)
            .then(res =>{
                console.log(res);
                if(res.status===200){
                    dispatch(saveToken(res.data));
                    navigate('/dashboard');
                } else{
                    console.log("eror")
                }
            }).catch(e => console.log("error"));
    }

    return (
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default LoginForm;