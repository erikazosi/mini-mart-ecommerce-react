import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import OrderIndex from "../../component/order/OrderIndex";

const { Content } = Layout;

const OrderHistory = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <OrderIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
};

export default OrderHistory;