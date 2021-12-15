import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import CartIndex from "../../component/cart/CartIndex";

const { Content } = Layout;

const Cart = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <CartIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default Cart;