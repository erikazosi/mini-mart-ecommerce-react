import React, {useState} from 'react';
import {Button, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from "axios";
import {saveToken} from "../../../redux/AuthenticateReducer";

const AddProduct = () => {
    const { TextArea } = Input;

    //TODO

    // const onFinish = (values) => {
    //     console.log('Received values of form: ', values);
    //     // console.log(values.username + " " + values.password);
    //     let userD = {username: values.username, password: values.password};
    //     // setUser(userD);
    //     console.log(userD)
    //     login(userD);
    // };
    //
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };
    //
    // const login =(user)=>{
    //     console.log(user);
    //     axios.post("http://localhost:8080/auth",user)
    //         .then(res =>{
    //             console.log(res);
    //             if(res.status===200){
    //                 // dispatch(saveToken(res.data));
    //                 // navigate('/dashboard');
    //             } else{
    //                 console.log("eror")
    //             }
    //         }).catch(e => console.log("error"));
    // }

    return (
        <Form
            name="normal_addPrd"
            className="addPrd-form"
            initialValues={{
                remember: true,
            }}
            // onFinish={onFinish}
        >
            <Form.Item
                name="prd-name"
                rules={[
                    {
                        required: true,
                        message: 'Please input product name!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                       placeholder="Product Name"/>
            </Form.Item>
            <Form.Item
                name="Description"
                rules={[
                    {
                        required: true,
                        message: 'Please input product description!',
                    },
                ]}
            >
                <TextArea rows={4} />

            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="add-prd-form-button" onClick={addPrd}>
                    Add Product
                </Button>
            </Form.Item>
        </Form>
    );

}

export default AddProduct;