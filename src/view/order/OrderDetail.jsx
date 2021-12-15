import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import OrderDetailComp from "../../component/order/OrderDetailComp";

const { Content } = Layout;

const OrderDetail = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <OrderDetailComp/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default OrderDetail;