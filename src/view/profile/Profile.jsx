import React, {useState} from 'react';
import SideBar from "../../component/sidebar/SideBar";
import NavBar from "../../component/navbar/NavBar";
import './style.css';
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";


const Profile = () => {
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
                        name="email"
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