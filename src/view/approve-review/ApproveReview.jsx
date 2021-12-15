import React from 'react';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import ApproveReviewIndex from "../../component/approve-review/ApproveReviewIndex";

const { Content } = Layout;

const ApproveReview = () => {
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <ApproveReviewIndex/>
            </Content>
            <FooterInd/>
        </Layout>
    );
}

export default ApproveReview;