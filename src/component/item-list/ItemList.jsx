import React, {useEffect, useState} from "react";
import './style.css';
import ItemCard from "./ItemCard.jsx";
import {SERVER_LOC} from "../../constant/Data";
import axios from "axios";
import {message} from "antd";
import {useSelector} from "react-redux";

const ItemList = (props) => {
    const [items, setItems] = useState([]);
    const authenticate = useSelector(state => state.authenticate);
    const isSeller = authenticate.token!=='' && authenticate.roles[0]==='SELLER';

    const fetchItems = () => {
        axios.get(SERVER_LOC + "/product")
            .then(res => {
                if(res.status === 200){
                    setItems(res.data);
                }
                else{
                    message.error("Error while loading items");
                }
            })
    };

    const deleteProduct = async (id) => {
        let response = await fetch(SERVER_LOC + "/product/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        });
        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success(result.message);
            fetchItems();
        }
        else{
            message.error(result.message);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    return (
        <div className="item-list-div">
            {items.map(item => <ItemCard key={item.id} data={item}
                                         isSeller={isSeller} deleteProduct={deleteProduct}/>)}
        </div>
    )
};

export default ItemList;