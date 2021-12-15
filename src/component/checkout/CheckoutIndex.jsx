import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, message} from "antd";
import {useSelector} from "react-redux";
import {SERVER_LOC} from "../../constant/Data";
import './style.css';
import {useNavigate} from "react-router-dom";

const CheckoutIndex = () => {
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [selectedPaymentId, setSelectedPaymentId] = useState(0);
    const [shippingAdd, setShippingAdd] = useState({address:'', city:'', state:'', contactNo:''});
    const [hasShippingAddData, setHasShippingAddData] = useState(false);

    const fetchPaymentDetail = () => {
        fetch(SERVER_LOC + '/user/' + authenticate.userId + '/payment-details', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(result => setPaymentDetail(result));
    };

    const selectPaymentDet = (id) => {
        setSelectedPaymentId(id);
    };

    const onFinishShippingAdd = (values) => {
        setShippingAdd(values);
        setHasShippingAddData(true);
    };

    const onFinishPayment = (values) => {
        let paymentInfo = values;
        paymentInfo['userId'] = authenticate.userId;
        fetch(SERVER_LOC + '/user/payment-details', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentInfo)
        })
            .then(res => {
                if(res.status === 201){
                    message.success("Saved.");
                    fetchPaymentDetail();
                }
                else
                    message.error("Error.");
            });
    };

    const checkoutOrder = () => {
        let checkout = {userId: authenticate.userId, paymentDetailId:selectedPaymentId, shippingAddress:shippingAdd};
        fetch(SERVER_LOC + '/order/checkout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(checkout)
        })
            .then(res => {
                if(res.status === 200){
                    message.success("OrderHistory Successful.");
                    navigate('/');
                }
                else
                    message.error("Error.");
            });
    }

    useEffect(() => {
        if(authenticate.userId !== 0)
            fetchPaymentDetail();

        if(authenticate.token === '' || authenticate.roles[0] !== 'BUYER')
            navigate('/');
    }, []);

    return (
        <>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinishShippingAdd}
            >
                <h2>Shipping Address Information</h2>
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
                    <Input disabled={hasShippingAddData}/>
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
                    <Input disabled={hasShippingAddData}/>
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
                    <Input disabled={hasShippingAddData}/>
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
                    <Input disabled={hasShippingAddData}/>
                </Form.Item>

                {!hasShippingAddData?
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Set Shipping Address
                        </Button>
                    </Form.Item>:
                    <></>}

            </Form>

            <h2>Payment Detail Select</h2>
            <p className='warning'>Please Select the existing payment account or add new one to proceed</p>
            <div className="payment-detail-div">
                {paymentDetail.map(pay =>
                        <Card className={`payment-card ${selectedPaymentId===pay.id?'selected-payment-card':''}`}
                              title={pay.paymentType}
                              style={{ width: 300 }}
                              onClick={() => selectPaymentDet(pay.id)}
                        >
                            <p>Payment Type : {pay.paymentType}</p>
                            <p>Card No : {pay.cardNo}</p>
                        </Card>
                )}
            </div>

            {
                hasShippingAddData && selectedPaymentId>0?
                    <div className='checkout-btn'>
                        <Button type="primary" htmlType="submit" size='large'
                                className="login-form-button"
                                onClick={checkoutOrder}
                        >
                            Checkout
                        </Button>
                    </div> :
                    <></>
            }

            <h2 style={{borderTop:'1px solid gray', paddingTop:'20px'}}>Add New Payment</h2>
            <Card style={{width: 600, margin:'auto', marginBottom:'20px'}}
                  title='Add New Payment'
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishPayment}
                >
                    <Form.Item
                        name="paymentType"
                        label="Payment Type"
                        rules={[
                            {
                                required: true,
                                message: 'Must not be empty',
                            },
                        ]}
                    >
                        <Input placeholder="MASTER / VISA / DEBIT"/>
                    </Form.Item>

                    <Form.Item
                        name="cardNo"
                        label="Card No"
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
                        name="securityCode"
                        label="Security No"
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
                        name="expiry"
                        label="Expiry"
                        rules={[
                            {
                                required: true,
                                message: 'Must not be empty',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default CheckoutIndex;