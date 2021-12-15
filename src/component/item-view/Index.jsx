import React, {useEffect, useState} from "react";
import './style.css';
import {message, Row} from "antd";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import {SERVER_LOC} from "../../constant/Data";
import axios from "axios";
import Review from "./Review";
import {useSelector} from "react-redux";

const Index = (props) => {
    const [data, setData] = useState(null);
    const authenticate = useSelector((state) => state.authenticate);

    const fetchItem = () => {
        axios.get(SERVER_LOC + `/product/${props.itemId}`)
            .then(res => {
                if(res.status === 200){
                    setData(res.data);
                }
                else{
                    message.error("Error while loading.");
                }
            })
    };

    useEffect(() => {
        fetchItem();
    }, [])


    return (
        <>
            {
                data !== null ?
                    <Row>
                        <ItemImage data={data.productImages} name={data.name}/>
                        <ItemDescription data={data} authenticate={authenticate}/>
                        <Review authenticate={authenticate} id={data.id}/>
                    </Row> :
                    <div>
                        Cannot load the Page.
                    </div>
            }
        </>
    )
}

export default Index;