import React, {useState} from 'react';

import {Layout, Menu} from 'antd';
import './style.css';
import {Link, NavLink} from "react-router-dom";

const {Header} = Layout;

const SellerNav = () => {
    return (
        <Header className="nav-bar-header">
            <span className="logo">
                <Link to="/">
                    {/*<img src={logo} alt="Easy Rent"/>*/}
                </Link>
            </span>
            <Menu className="nav-bar-menu" theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/item">
                        <span>My Products</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/profile">
                        <span>My Profile</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/logout">
                        <span>Logout</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default SellerNav;