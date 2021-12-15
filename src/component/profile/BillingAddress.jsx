import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {SERVER_LOC} from "../../constant/Data";

const BillingAddress = (props) => {
    const form = useRef(null);

    const updateBillingAddress = (values) => {
        let addInfo = values;
        addInfo['id'] = props.address.id;

        fetch(SERVER_LOC + '/user/billing-address/update', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + props.authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addInfo)
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
            address: props.address.address,
            city: props.address.city,
            state: props.address.state,
            contactNo: props.address.contactNo
        });
    });

    return (
        <div style={{marginBottom:'30px', borderBottom:'1px solid black'}}>
            <Form
                name="normal_login"
                className="login-form"
                ref={form}
                onFinish={updateBillingAddress}
            >
                <h2>Billing Address Information</h2>
                <Form.Item
                    name="address"
                    label="Address"
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
                    name="city"
                    label="City"
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
                    name="state"
                    label="State"
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
                    name="contactNo"
                    label="Contact No"
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

export default BillingAddress;