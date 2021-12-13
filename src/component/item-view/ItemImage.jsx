import React from 'react';
import {Col} from "antd";

const ItemImage = (props) => {
    return (
        <Col md={12}>
            <div className="item-all-images">
                <div className="item-image-highlight">
                    <img src={props.data.imagePath} alt={props.data.name}/>
                </div>
                <div className="item-image-small">
                    <img src={props.data.imagePath} alt={props.data.name}/>
                </div>
            </div>
        </Col>
    );
}

export default ItemImage;