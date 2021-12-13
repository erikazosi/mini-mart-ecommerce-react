import React from 'react';
import NavBar from "../../component/navbar/NavBar.jsx";
import FooterInd from "../../component/footer/FooterInd.jsx";
import {Layout} from "antd";
import Index from "../../component/login/Index";

const { Content } = Layout;

const Login = () => {
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

export default Login;