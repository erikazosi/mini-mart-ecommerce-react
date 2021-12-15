import React, {useState} from 'react';
import {Col} from "antd";
import {SERVER_LOC} from "../../constant/Data";

const ItemImage = (props) => {
    const [selected, setSelected] = useState(0);

    const onSelect = (ind) => {
        setSelected(ind);
    }

    return (
        <Col md={12}>
            <div className="item-all-images">
                <div className="item-image-highlight">
                    <img src={props.data.size!==0?SERVER_LOC + props.data[selected].imageUrl:""} alt={props.name}/>
                </div>
                <div className="item-image-small">
                    {
                        props.data.map((img, ind) =>
                            <span className="small-images" key={ind} onClick={() => onSelect(ind)}>
                                <img src={SERVER_LOC + img.imageUrl} alt={props.name}/>
                            </span>)
                    }
                </div>
            </div>
        </Col>
    );
}

export default ItemImage;