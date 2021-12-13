import React from 'react';
import {Layout, Menu} from 'antd';
import './style.css';
import {Link, NavLink} from "react-router-dom";
import BuyNav from "./BuyNav";
import SellerNav from "./SellerNav";
import HomeNav from "./HomeNav";
import AdminNav from "./AdminNav";

const {Header} = Layout;

const NavBar = () => {
    return (
        //TODO if else for user role
        <div id="nav-bar">
            <BuyNav></BuyNav>
            {/*<SellerNav></SellerNav>*/}
            {/*<HomeNav></HomeNav>*/}
            {/*<AdminNav></AdminNav>*/}
        </div>
    );
};

export default NavBar;