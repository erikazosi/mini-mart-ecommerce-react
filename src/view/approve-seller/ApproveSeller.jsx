import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import ApproveSellerIndex from "../../component/approve-seller/ApproveSellerIndex";

const { Content } = Layout;

const ApproveSeller = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <ApproveSellerIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default ApproveSeller;