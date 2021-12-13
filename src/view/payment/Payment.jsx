import React, {useState} from 'react';
import NavBar from "../../component/navbar/NavBar";
import SideBar from "../../component/sidebar/SideBar";
import {Button, DatePicker, Form, Input, Space} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import moment from "moment";

const Payment = () => {

    const dateFormat = 'YYYY-MM-DD';


    return (
        <>
            <NavBar></NavBar>
            <div id='sidebar'>
                <SideBar></SideBar>
            </div>
            <div id="payment">
                <Form
                    name="normal_payment-info"
                    className="login-form"
                    initialValues={{
                           remember: true,
                    }}
                    // onFinish={onFinish}
                >
                    <Form.Item
                        label="Card Number"
                        name="card-number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Card Number!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} disabled
                               placeholder="Card Number"  />
                    </Form.Item>
                    <Form.Item
                        label="Name on Card"
                        name="card name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your card name!',
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
                    <Form.Item
                        label="Expiration Date"
                        name="expiration date"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Space direction="vertical" size={12}>
                            <DatePicker picker="month" defaultValue={moment('2015-06', 'YYYY-MM')} disabled />

                        </Space>
                    </Form.Item>
                    <Link to="">Edit Information </Link>
                    <Form.Item>
                        {/*//TODO if data is empty enable add and input fields*/}
                        <Button type="primary" htmlType="submit" className="login-form-button" disabled>
                            Add
                        </Button> <span></span>
                        <Button type="primary" htmlType="submit" className="login-form-button" disabled>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
}

export default Payment;