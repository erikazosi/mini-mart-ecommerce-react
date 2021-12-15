import React, {useEffect, useState} from 'react';
import './style.css';
import {message, Space, Table, Tag} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SERVER_LOC} from "../../constant/Data";

const ApproveSellerIndex = () => {
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const [sellers, setSellers] = useState([]);

    const columns = [
        {
            title: 'Firstname',
            dataIndex: 'firstname',
            key: 'firstname'
        },
        {
            title: 'Middlename',
            dataIndex: 'middlename',
            key: 'middlename',
        },
        {
            title: 'Lastname',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Role',
            key: 'roles',
            dataIndex: 'roles',
            render: roles => <> {roles.map(role => <Tag color='red' key={role.id}>{role.role}</Tag>)}</>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <p className="p-link" onClick={() => approveSeller(record)}>Approve</p>
                </Space>
            ),
        },
    ];

    const fetchSellers = () => {
        fetch(SERVER_LOC + "/user/seller/unapproved/get-all", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res=> {
                if(res.status === 200)
                    return res.json();
                else message.error("Error while loading carts.");
            })
            .then(result => {
                setSellers(result)
            });
    };

    const approveSeller = async (value) => {
        let response = await fetch(SERVER_LOC + "/user/seller/" + value.id + "/approve", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        );

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success(result.message);
            fetchSellers();
        }
        else{
            message.error(result.message);
        }
    };

    useEffect(() => {
        if(authenticate.token === '' || authenticate.roles[0] !== 'ADMIN')
            navigate('/');
        fetchSellers();
    });

    return (
        <>
            <Table columns={columns} dataSource={sellers} pagination={false}/>
        </>
    );
}

export default ApproveSellerIndex;