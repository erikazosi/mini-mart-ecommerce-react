import React from 'react';
import {Layout} from 'antd';
import './style.css';
import BuyNav from "./BuyNav";
import SellerNav from "./SellerNav";
import HomeNav from "./HomeNav";
import AdminNav from "./AdminNav";
import {useSelector} from "react-redux";

const {Header} = Layout;

const NavBar = () => {
    const authenticatedData = useSelector(state => state.authenticate);

    const navBarChoice = () => {
        if(authenticatedData.roles !== undefined){
            switch (authenticatedData.roles[0]){
                case 'BUYER':
                    return <BuyNav/>;
                case 'SELLER':
                    return <SellerNav/>;
                case 'ADMIN':
                    return <AdminNav/>;
                default:
                    return <HomeNav/>;
            }
        }
        else{
            return <HomeNav/>;
        }
    }
    return (
        <div id="nav-bar">
            {navBarChoice()}
        </div>
    );
};

export default NavBar;