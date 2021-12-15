import React, {useEffect, useRef, useState} from 'react';
import {Button, Checkbox, Form, Input, message} from "antd";
import './style.css';
import {SERVER_LOC} from "../../constant/Data";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

const { TextArea } = Input;

const UpdateProductIndex = () => {
    const form = useRef(null);

    const param = useParams();
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const [onSale, setOnSale] = useState(true);
    const [product, setProduct] = useState({id:0, name:'', actualPrice:0, salePrice:0,
        onSale: true, stockQuantity:0, description:'', highlights:''});

    const onCheckboxChange = (e) => {
        setOnSale(e.target.checked);
    };

    const fetchProduct = () => {
        fetch(SERVER_LOC + "/product/" + param.id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if(response.status === 200)
                    return response.json();
                else
                    message.error("Failed to fetch data.");
            })
            .then(res => {
                let data = {id:res.id, name:res.name, actualPrice:res.actualPrice, salePrice:res.salePrice,
                    onSale: res.onSale, stockQuantity:res.stockQuantity, description:res.description, highlights:res.highlights};

                setProduct(data);
                setOnSale(res.onSale);
                form.current.setFieldsValue({
                    name:res.name,
                    actualPrice:res.actualPrice,
                    salePrice:res.salePrice,
                    stockQuantity:res.stockQuantity,
                    description:res.description,
                    highlights:res.highlights
                });
            })
    };


    const onUpdateProduct = async (values) => {
        let data = values;
        data['onSale'] = onSale;
        data['id'] = product.id;
        data['userId'] = authenticate.userId;

        let response = await fetch(SERVER_LOC + '/product', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success(result.message);
            navigate('/');
        }
        else{
            message.error(result.message);
        }
    };

    useEffect(() => {
        if(authenticate.token === '' || authenticate.roles[0] !== 'SELLER')
            navigate('/');

        fetchProduct();
    }, []);

    return (
        <div className="product-div">
            <h1>Update Product</h1>
            <Form
                ref={form}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onUpdateProduct}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="onSale"
                    label="On Sale"
                >
                    <Checkbox checked={onSale} onChange={onCheckboxChange}/>
                </Form.Item>

                <Form.Item
                    name="actualPrice"
                    label="Actual Price"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item
                    name="salePrice"
                    label="Sale Price"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item
                    name="stockQuantity"
                    label="Stock"
                    rules={[
                        {
                            required: true,
                            message: 'Must not be empty',
                        },
                    ]}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item
                    name="highlights"
                    label="Highlights"
                >
                    <TextArea
                        placeholder="Highlights"
                        autoSize={{ minRows: 4 }}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea
                        placeholder="Description"
                        autoSize={{ minRows: 4 }}
                    />
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

export default UpdateProductIndex;