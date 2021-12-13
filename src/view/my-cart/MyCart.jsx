import React from "react";
import {Layout} from "antd";
import './style.css';
import ItemList from "../../component/item-list/ItemList.jsx";
import FooterInd from "../../component/footer/FooterInd.jsx";
import NavBar from "../../component/navbar/NavBar";

const { Content } = Layout;

const MyCart = () => {
    return (
        <Layout>
            <NavBar/>

            //TODO select multiple items and make purchase
            <Content className="main-body">
                <ItemList/>
            </Content>
            <FooterInd/>
        </Layout>
    )
}

export default MyCart;