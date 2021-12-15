import React, {useEffect, useState} from 'react';
import {SERVER_LOC} from "../../constant/Data";
import {Button, message} from "antd";
import {useSelector} from "react-redux";
import './style.css';
import CartItem from "./CartItem";
import {useNavigate} from "react-router-dom";

const CartIndex = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const authenticate = useSelector((state) => state.authenticate);

    const fetchItems = () => {
        fetch(SERVER_LOC + "/cart/user/" + authenticate.userId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res=> {
                if(res.status === 200)
                    return res.json();
                else message.error("Error while loading carts.");
            })
            .then(result => {
                setItems(result)
            });
    };

    const deleteFromCart = (id) => {
        fetch(SERVER_LOC + "/cart/" + id , {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res=> {
                if(res.status === 200){
                    message.success("Deleted");
                    fetchItems();
                }
                else message.error("Error.");
            });
    };

    const checkout = () => {
        navigate("/checkout");
    }

    useEffect(() => {
        if(authenticate.userId !== 0)
            fetchItems();

        if(authenticate.token === '' || authenticate.roles[0] !== 'BUYER')
            navigate('/');
    }, [])

    return (
        <>
            <h1 style={{textAlign:'center', marginBottom:'20px', fontWeight:'700'}}>Carts</h1>
            <div className="cart-list-div">
                {items.map(item => <CartItem key={item.id} cartId={item.id} data={item['product']}
                                             quantity={item.quantity}
                                             showDel={true} deleteFromCart={deleteFromCart}/>)}
            </div>
            {items.length>0?<div className="checkout-btn">
                <Button type='primary' size='large' onClick={checkout}>Checkout</Button>
            </div>:<></>}
        </>
    )
}

export default CartIndex;