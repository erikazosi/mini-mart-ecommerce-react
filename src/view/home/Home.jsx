import React from "react";
import {Layout} from "antd";
import './style.css';
import ItemList from "../../component/item-list/ItemList.jsx";
import FooterInd from "../../component/footer/FooterInd.jsx";
import NavBar from "../../component/navbar/NavBar";

const { Content } = Layout;

const Home = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <ItemList/>
            </Content>
            <FooterInd/>
        </Layout>
    )
}

export default Home;