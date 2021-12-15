import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, message} from "antd";
import {SERVER_LOC} from "../../constant/Data";

const PaymentDetail = (props) => {
    const [paymentDetail, setPaymentDetail] = useState([]);

    const fetchPaymentDetail = () => {
        fetch(SERVER_LOC + '/user/' + props.authenticate.userId + '/payment-details', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + props.authenticate.token,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(result => setPaymentDetail(result));
    };

    const onFinishPayment = (values) => {
        let paymentInfo = values;
        paymentInfo['userId'] = props.authenticate.userId;
        fetch(SERVER_LOC + '/user/payment-details', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.authenticate.token,
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

    useEffect(() => {
        if(props.authenticate.userId !== 0)
            fetchPaymentDetail();
    }, []);

    return (
        <>
            <h2>Payment Details</h2>
            <div className="payment-detail-div">
                {paymentDetail.map(pay =>
                    <Card key={pay.id} className='payment-card'
                          title={pay.paymentType}
                          style={{ width: 300 }}
                    >
                        <p>Payment Type : {pay.paymentType}</p>
                        <p>Card No : {pay.cardNo}</p>
                    </Card>
                )}
            </div>

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

export default PaymentDetail;