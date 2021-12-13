import React from "react";
import './style.css';
import ItemCard from "./ItemCard.jsx";
import {ITEMS} from "../../constant/Data";

class ItemList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: ITEMS
        }
    }

    render() {
        return (
            <div className="item-list-div">
                {
                    Object.keys(this.state.items).map(itemId => <ItemCard key={itemId} data={this.state.items[itemId]}/>)
                }
            </div>
        )
    }
}

ItemList.propTypes = {}
export default ItemList;