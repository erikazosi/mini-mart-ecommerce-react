import React, {useEffect, useState} from 'react';
import OrderList from "./OrderList";
import {SERVER_LOC} from "../../constant/Data";
import {message} from "antd";
import {useNavigate} from "react-router-dom";

const BuyerOrderIndex = (props) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const fetchOrders = () => {
        fetch(SERVER_LOC + "/order/user/" + props.authenticate.userId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + props.authenticate.token,
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
                setOrders(result);
            });
    };

    useEffect(() => {
        if(props.authenticate.token === '' || props.authenticate.roles[0] !== 'BUYER')
            navigate('/');

        if(props.authenticate.userId !== 0)
            fetchOrders();
    }, []);

    return (
        <>
            <OrderList orders={orders}/>
        </>
    );
}

export default BuyerOrderIndex;