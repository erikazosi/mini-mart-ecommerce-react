import React, {useState} from 'react';
import SideBar from "../../component/sidebar/SideBar";
import NavBar from "../../component/navbar/NavBar";
import './style.css';
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


const Profile = () => {
    const onFinish = (values) =>{

    }
    return (
        <>
            <NavBar></NavBar>
            <div id='sidebar'>
            <SideBar></SideBar>
            </div>
            <div id="info">
                <Form
                    name="normal_user-info"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                >
                    <Form.Item
                        name="firstname"
                        label ="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name!',
                            },
                        ]}
                    >
                        <Input                         placeholder="First Name"
                        />
                    </Form.Item>
                    <Form.Item
                        name="middlename"
                        label ="Middle Name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your Middle Name!',
                            },
                        ]}
                    >
                        <Input                         placeholder="Middle Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label ="Last Name"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ]}
                    >
                        <Input placeholder="Last Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label ="Email"

                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled
                               placeholder="Email"  />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label ="Password"

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
                            disabled
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Link to="">Edit Information </Link>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" disabled>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );

}

export default Profile;