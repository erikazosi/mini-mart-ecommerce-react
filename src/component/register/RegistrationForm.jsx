import React,{useState} from 'react';
import {Button, Checkbox, Form, Input, Select,Radio} from 'antd';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {saveToken} from "../../redux/AuthenticateReducer";

const { Option } = Select;




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
    const [value, setValue] = useState(1);

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const [user,steUser] = useState({email:'',password:''});
    const navigate= useNavigate();
    const  dispatch = useDispatch();

    function registerClick(){
        navigate('/home');
    }


    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const login=(user)=>{
        axios.post("http://localhost:8080/register",user)
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
                name="email"
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
            <Form.Item name="user-type"
                       label="Register As: "
                       rules={[
                               {
                                   required: true,
                                   message: 'Please select the registration type!',
                               }]}>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>Buyer</Radio>
                    <Radio value={2}>Seller</Radio>

                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href="/">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" onClick="registerClick">
                    Register
                </Button>
            </Form.Item>


        </Form>
    );
};

export default RegistrationForm;