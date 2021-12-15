import React from 'react';
import {Layout, Menu} from 'antd';
import './style.css';
import {Link, NavLink} from "react-router-dom";

const {Header} = Layout;

const HomeNav = () => {
    return (
        <Header className="nav-bar-header">
            <Menu className="nav-bar-menu" theme="dark" mode="horizontal">
                <Menu.Item key="1">
                    <NavLink to="/">
                        <span>Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to="/register">
                        <span>Register</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to="/login">
                        <span>Login</span>
                    </NavLink>
                </Menu.Item>
            </Menu>
        </Header>
    );

}

export default HomeNav;