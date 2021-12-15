import React from 'react';
import {Button, Card} from 'antd';
import {useNavigate} from "react-router-dom";
import './style.css';
import {SERVER_LOC} from "../../constant/Data";

const {Meta} = Card;

const ItemCard = (props) => {
    const navigate = useNavigate();

    const onImageClick = () => {
        navigate('/item/'+props.data.id);
    };

    const makeShortDescription = (highlights) => {
        const maxLen = 40;
        if(highlights.length < maxLen) return highlights;
        else return highlights.substr(0, maxLen) + '...';
    };

    const updateProduct = (id) => {
        navigate('/update-product/' + id);
    };

    return (
        <Card
            className="item-card-div"
            hoverable
            cover={<img alt={props.data.name} onClick={() => onImageClick()}
                        src={SERVER_LOC + props.data.productImages[0].imageUrl}/>}
        >
            <Meta title={props.data.name} />
            <span>
                {props.data.onSale?
                    <span><strike>${props.data.actualPrice}</strike> <span>${props.data.salePrice}</span></span>:
                    <span>${props.data.salePrice}</span>}
            </span>
            <p style={{color: 'gray'}}>{makeShortDescription(props.data.highlights)}</p>
            {
                props.isSeller?
                    <>
                        <Button style={{marginBottom:'5px'}} type='primary' size='large' onClick={() => updateProduct(props.data.id)}>
                            Click here to edit
                        </Button>
                        <Button type='danger' size='large' onClick={() => props.deleteProduct(props.data.id)}>
                            Delete
                        </Button>
                    </>:<></>
            }
        </Card>
    );
}

export default ItemCard;