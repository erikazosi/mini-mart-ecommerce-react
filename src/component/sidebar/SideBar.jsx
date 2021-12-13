import React, {useState} from 'react';

import { Menu, Switch, Divider } from 'antd';
import './style.css';
import {
   UserOutlined,
    CompassOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,MoneyCollectOutlined,SendOutlined,DollarOutlined
} from '@ant-design/icons';
import {Link, NavLink} from "react-router-dom";

const { SubMenu } = Menu;

const SideBar = () => {
    const [mode, setMode] = React.useState('inline');
    const [theme, setTheme] = React.useState('light');

    const changeMode = value => {
        setMode(value ? 'vertical' : 'inline');
    };

    const changeTheme = value => {
        setTheme(value ? 'dark' : 'light');
    };

    return (
        <div id='side-menu'>
            <Menu
                style={{ width: 256,height:"100%",position:"fixed"}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={mode}
                theme="dark"
            >
                <Menu.Item key="1" icon={<UserOutlined />}>
                    <Link to="/user-info">
                        <span>User Information</span>
                    </Link>
                </Menu.Item>
                <Menu.Item  key="2" icon={<MoneyCollectOutlined />}>
                    <Link to="/pay-info">
                        <span>Payment Information</span>
                    </Link>

                </Menu.Item>
                <SubMenu key="sub1" icon={<CompassOutlined />} title="Address">
                    <Menu.Item key="3" icon={<SendOutlined />}>
                        <Link to="/shipping">
                            <span> Shipping Address</span>
                        </Link>
                       </Menu.Item>
                    <Menu.Item key="4" icon={<DollarOutlined />}>
                        <Link to="/billing">
                            <span> Billing Address</span>
                        </Link> </Menu.Item>

                </SubMenu>

            </Menu>
        </div>
    );
};

export default SideBar;