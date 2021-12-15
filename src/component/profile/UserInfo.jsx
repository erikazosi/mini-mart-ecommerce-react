import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {SERVER_LOC} from "../../constant/Data";

const UserInfo = (props) => {
    const form = useRef(null);

    const updateUserInfo = (values) => {
        let userInfo = values;
        userInfo['id'] = props.info.id;

        fetch(SERVER_LOC + '/user/info/update', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + props.authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => {
                if(res.status === 200){
                    message.success("Updated.");
                }
                else
                    message.error("Error.");
            });
    };

    useEffect(() => {
        form.current.setFieldsValue({
            firstname: props.info.firstname,
            middlename: props.info.middlename,
            lastname: props.info.lastname

        });
    });

    return (
        <div style={{marginBottom:'30px', borderBottom:'1px solid black'}}>
            <Form
                name="normal_login"
                className="login-form"
                ref={form}
                onFinish={updateUserInfo}
            >
                <h2>User Information</h2>
                <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="middlename"
                    label="Middle Name"
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UserInfo;