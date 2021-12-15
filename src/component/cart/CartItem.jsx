import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {SERVER_LOC} from "../../constant/Data";
import {Card, message} from "antd";
import {useSelector} from "react-redux";

const {Meta} = Card;

const CartItem = (props) => {
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const price = props.data.onSale?props.data.salePrice*props.quantity:props.data.actualPrice*props.quantity;

    const onImageClick = () => {
        navigate('/item/'+props.data.id);
    };

    const makeShortDescription = (highlights) => {
        const maxLen = 40;
        if(highlights.length < maxLen) return highlights;
        else return highlights.substr(0, maxLen) + '...';
    };

    return (
        <Card
            className="cart-card-div"
            hoverable
            cover={<img alt={props.data.name} src={SERVER_LOC + props.data.productImages[0].imageUrl}
                        onClick={() => onImageClick()}/>}
        >
            <Meta title={props.data.name} />
            <span>
                {props.data.onSale?
                    <span><strike>${props.data.actualPrice}</strike> <span>${props.data.salePrice}</span></span>:
                    <span>${props.data.salePrice}</span>}
            </span>
            <p style={{color: 'gray'}}>{makeShortDescription(props.data.highlights)}</p>
            <p>Quantity : {props.quantity}</p>
            <p>Price : ${price}</p>
            {props.showDel?<p className="p-link" onClick={() => props.deleteFromCart(props.cartId)}>Delete</p>:<></>}
        </Card>
    );
}

export default CartItem;