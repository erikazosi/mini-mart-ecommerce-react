import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import CheckoutIndex from "../../component/checkout/CheckoutIndex";

const { Content } = Layout;

const Checkout = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <CheckoutIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default Checkout;