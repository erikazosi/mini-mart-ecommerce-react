import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import UpdateProductIndex from "../../component/update-product/UpdateProductIndex";

const { Content } = Layout;

const UpdateProduct = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <UpdateProductIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default UpdateProduct;