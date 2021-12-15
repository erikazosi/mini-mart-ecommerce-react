import React from 'react';

import {Layout, Menu} from 'antd';
import './style.css';
import {NavLink} from "react-router-dom";

const {Header} = Layout;

const AdminNav = () => {
    return (
        <Header className="nav-bar-header">
            <Menu className="nav-bar-menu" theme="dark" mode="horizontal">
                <Menu.Item className="disabled-menu" key="app" disabled>
                    You are Admin
                </Menu.Item>
                <Menu.Item key="1">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/approve-sellers">
                        <span>Review Sellers</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/approve-reviews">
                        <span>Approve Reviews</span>
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

export default AdminNav;