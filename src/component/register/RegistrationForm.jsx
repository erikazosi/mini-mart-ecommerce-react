import React, {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import axios from "axios";
import {SERVER_LOC} from "../../constant/Data";
import {useNavigate} from "react-router-dom";

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationForm = () => {
    const navigate = useNavigate();
    const type = {buyer: 'BUYER', seller: 'SELLER'};
    const [form] = Form.useForm();
    const [registrationType, setRegistrationType] = useState('');

    const chooseRegistrationType = (e, type) => {
        e.preventDefault();
        setRegistrationType(type);
    };

    const registerBuyer = (userData) => {
        let user = {firstname: userData.firstname, middlename: userData.middlename, lastname: userData.lastname,
            username: userData.username, password: userData.password};
        user['billingAddress'] = {address:userData.address, city:userData.city, state:userData.state,
            contactNo:userData.contactNo};
        console.log(user);
        axios.post(SERVER_LOC + "/user/buyer/save", user)
            .then(res => {
                if(res.status === 201){
                    message.success("Saved");
                    navigate('/login');
                }
                else{
                    message.error(res.data.message);
                }
            }).catch(e => message.error( "Error."));
    };

    const registerSeller = (userData) => {
        let user = {firstname: userData.firstname, middlename: userData.middlename, lastname: userData.lastname,
            username: userData.username, password: userData.password};
        console.log(user);
        axios.post(SERVER_LOC + "/user/seller", user)
            .then(res => {
                if(res.status === 201){
                    message.success("Saved");
                    navigate('/login');
                }
                else{
                    message.error(res.data.message);
                }
            }).catch(e => message.error( "Error."));
    };

    const onFinish = (values) => {
        if(registrationType === type.buyer)
            registerBuyer(values);
        else if(registrationType === type.seller)
            registerSeller(values);
    };

    return (
        <div>
            <h2>
                {registrationType.substr(0, 1) +
                    registrationType.toLowerCase().substr(1)} Registration
            </h2>
            {
                registrationType !== '' ?
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="firstname"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="middlename"
                            label="Middle Name"
                            initialValue=''
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="lastname"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* ----- Address --------- */}
                        {
                            registrationType === type.buyer ?
                                <>
                                    <h2>Address Information</h2>
                                    <Form.Item
                                        name="address"
                                        label="Address"
                                        rules={[
                                            {
                                                required: registrationType === type.buyer,
                                                message: 'Must not be empty',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="city"
                                        label="City"
                                        rules={[
                                            {
                                                required: registrationType === type.buyer,
                                                message: 'Must not be empty',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="state"
                                        label="State"
                                        rules={[
                                            {
                                                required: registrationType === type.buyer,
                                                message: 'Must not be empty',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="contactNo"
                                        label="Contact No"
                                        rules={[
                                            {
                                                required: registrationType === type.buyer,
                                                message: 'Must not be empty',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </> : ""
                        }

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" onClick="registerClick">
                                Register
                            </Button>
                        </Form.Item>
                    </Form> :
                    <div className="registration-choice">
                        <Button type="primary" size='large' onClick={(e) => chooseRegistrationType(e, type.buyer)}>
                            Register as Buyer
                        </Button>
                        <Button type="primary" size='large' onClick={(e) => chooseRegistrationType(e, type.seller)}>
                            Register as Seller
                        </Button>
                    </div>
            }
        </div>
    );
};

export default RegistrationForm;