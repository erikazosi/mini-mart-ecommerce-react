import React, {useState} from 'react';
import {Button, Col, DatePicker, Descriptions, message, Spin} from "antd";

const { RangePicker } = DatePicker;

const ItemDescription = (props) => {
    const [spin, setSpinning] = useState(false);
    const [displayRentOption, setDisplayRentOption] = useState(false);

    const success = () => {
        setSpinning(true);
        setTimeout(() => {
            message.success('Request Sent. The rentee will notify you about item.');
            setSpinning(false);
        }, 3000)
    };

    return (
        <Col md={12}>
            <Spin size="large" spinning={spin}>
                <div className="item-descriptions">
                    <Descriptions title="Item Description"
                                  layout="horizontal"
                                  column={{ md: 1 }}
                                  bordered
                                  size='middle'
                    >
                        <Descriptions.Item label="Name">{props.data.name}</Descriptions.Item>
                        <Descriptions.Item label="Description">{props.data.description}</Descriptions.Item>
                    </Descriptions>

                    <div className="rent-it-option-div">
                        <div className="rent-it-button">
                            <Button type="primary"
                                    size={'large'}
                                    disabled={displayRentOption}
                                    onClick={() => setDisplayRentOption(!displayRentOption)}
                            >
                                Rent it
                            </Button>
                        </div>

                        {
                            displayRentOption ?
                                <div className='rent-it-option'>
                                    <span><RangePicker /></span>
                                    <span>
                                    <Button type="primary"
                                            size={'large'}
                                            disabled={!displayRentOption}
                                            onClick={success}
                                    >
                                    Submit Request
                                </Button>
                                </span>
                                </div>
                                : ''
                        }
                    </div>
                </div>
            </Spin>
        </Col>
    );
}

export default ItemDescription;