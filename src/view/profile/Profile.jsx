import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import './style.css';
import {Layout} from "antd";
import FooterInd from "../../component/footer/FooterInd";
import ProfileIndex from "../../component/profile/ProfileIndex";

const { Content } = Layout;

const Profile = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <ProfileIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );

}

export default Profile;