import React from 'react';
import NavBar from "../../component/navbar/NavBar.jsx";
import FooterInd from "../../component/footer/FooterInd.jsx";
import {Layout} from "antd";
import Index from "../../component/register/Index";

const { Content } = Layout;

const Register = (props) => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body long-vertical-height">
                <Index/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default Register;