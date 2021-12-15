import React from 'react';

import {Layout, Menu} from 'antd';
import './style.css';
import {NavLink} from "react-router-dom";

const {Header} = Layout;

const BuyNav = () => {
    return (
        <Header className="nav-bar-header">
            <Menu className="nav-bar-menu" theme="dark" mode="horizontal">
                <Menu.Item className="disabled-menu" key="app" disabled>
                    You are Buyer
                </Menu.Item>
                <Menu.Item key="1">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/cart">
                        <span>View Cart</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to="/order-history">
                        <span>View Orders</span>
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="5">
                    <NavLink to="/profile">
                        <span>My Profile</span>
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="6">
                    <NavLink to="/following">
                        <span>Following</span>
                    </NavLink>
                </Menu.Item>

                <Menu.Item key="7">
                    <NavLink to="/logout">
                        <span>Logout</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default BuyNav;