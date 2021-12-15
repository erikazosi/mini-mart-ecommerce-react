import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import FollowingIndex from "../../component/following/FollowingIndex";

const { Content } = Layout;

const Following = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <FollowingIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default Following;