import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import AddProductIndex from "../../component/add-product/AddProductIndex";

const { Content } = Layout;

const AddProduct = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <AddProductIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default AddProduct;