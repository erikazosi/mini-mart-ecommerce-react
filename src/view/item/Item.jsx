import React, {useState} from "react";
import './style.css';
import NavBar from "../../component/navbar/NavBar";
import FooterInd from "../../component/footer/FooterInd";
import {Layout} from "antd";
import Index from "../../component/item-view/Index";
import {useParams} from "react-router-dom";

const { Content } = Layout;

const Item = () => {
    const param = useParams();

    const [itemId, setItemId] = useState(param.id);

    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <Index itemId={itemId}/>
            </Content>
            <FooterInd/>
        </Layout>
    )
}

export default Item;