import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import SellerOrderIndex from "./SellerOrderIndex";
import BuyerOrderIndex from "./BuyerOrderIndex";
import {useNavigate} from "react-router-dom";

const OrderIndex = () => {
    const authenticate = useSelector((state) => state.authenticate);
    const isSeller = authenticate.token!=='' && authenticate.roles[0]==='SELLER';

    return (
        <>
            {
                isSeller ?
                    <SellerOrderIndex authenticate={authenticate}/> :
                    <BuyerOrderIndex authenticate={authenticate}/>
            }
        </>
    );
}

export default OrderIndex;