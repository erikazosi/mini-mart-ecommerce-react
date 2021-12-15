import React, {useState} from 'react';
import {Button, Col, Descriptions, message, Spin} from "antd";
import {SERVER_LOC} from "../../constant/Data";
import {useNavigate} from "react-router-dom";

const ItemDescription = (props) => {
    const navigate = useNavigate();
    const [spin, setSpinning] = useState(false);
    const isBuyer = props.authenticate.token!=='' && props.authenticate.roles[0]==='BUYER';
    const [quantity, setQuantity] = useState(1);

    const addToCart = async () => {
        setSpinning(true);
        let cartinfo = {productId:props.data.id, userId: props.authenticate.userId, quantity: quantity};

        let response = await fetch(SERVER_LOC+"/cart", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + props.authenticate.token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartinfo)
            }
        );

        let status = response.status;
        let result = await response.json();

        setSpinning(false);
        if(status === 201){
            message.success(result.message);
        }
        else{
            message.error(result.message);
        }
    };

    const handleChange = (e) => {
        setQuantity(e.target.value);
    }

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
                        {isBuyer?<Descriptions.Item label="Quantity"><input onChange={handleChange} value={quantity}/></Descriptions.Item>:""}
                        <Descriptions.Item label="In Stock">{props.data.stockQuantity>0?"Yes":"No"}</Descriptions.Item>
                        {
                            props.data.onSale?
                                <>
                                    <Descriptions.Item label="Actual Price">${props.data.actualPrice}</Descriptions.Item>
                                    <Descriptions.Item label="Sale Price">${props.data.salePrice}</Descriptions.Item>
                                </> :
                                <>
                                    <Descriptions.Item label="Price">${props.data.actualPrice}</Descriptions.Item>
                                </>
                        }
                        <Descriptions.Item label="Highlights">{props.data.highlights}</Descriptions.Item>
                        <Descriptions.Item label="Description">{props.data.description}</Descriptions.Item>
                    </Descriptions>

                    {
                        isBuyer?
                            <div className="rent-it-option-div">
                                <div className="rent-it-button">
                                    <Button type="primary"
                                            size={'large'}
                                            onClick={addToCart}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div> :
                            <p style={{marginTop: '10px', fontSize:'17px', color:'red'}}>Login as a Buyer to buy.</p>
                    }
                </div>
            </Spin>
        </Col>
    );
}

export default ItemDescription;