import React from 'react';
import {Card} from 'antd';
import {useNavigate} from "react-router-dom";
import './style.css';

const {Meta} = Card;

const ItemCard = (props) => {
    const navigate = useNavigate();

    const onImageClick = () => {
        navigate('/item/'+props.data.id);
    };

    return (
        <Card
            className="item-card-div"
            hoverable
            cover={<img alt={props.data.name} src={props.data.imagePath} />}
            onClick={() => onImageClick()}
        >
            <Meta title={props.data.name} description= {props.data.description} />
        </Card>
    );
}

export default ItemCard;