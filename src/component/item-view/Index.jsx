import React, {useState} from "react";
import './style.css';
import {Row} from "antd";
import ItemImage from "./ItemImage";
import ItemDescription from "./ItemDescription";
import {ITEMS} from "../../constant/Data";

const Index = (props) => {
    const [data, setData] = useState(ITEMS[props.itemId]);

    return (
        <Row>
            <ItemImage data={data}/>
            <ItemDescription data={data}/>
        </Row>
    )
}

export default Index;