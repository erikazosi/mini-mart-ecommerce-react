import React from 'react';
import {Table, Tag} from "antd";
import {useNavigate} from "react-router-dom";
import './style.css';

const columns = [
    {
        title: 'Order Id',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdId',
    },
    {
        title: 'Order Status',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: tag => <>{tag.status==='NEW'?<Tag color='green' key={tag}>{tag.status}</Tag>:
            <Tag color='gray' key={tag}>{tag.status}</Tag>}</>
    },
    {
        title: 'Total Price',
        key: 'orderItems',
        dataIndex: 'orderItems',
        render: items => <>
            ${items.reduce((total, item) => total + item.quantity * item.itemPrice, 0)}
        </>
    }
];

const OrderList = (props) => {
    const navigate = useNavigate();

    const onRowClick = (id) => {
        navigate('/order/' + id);
    };

    return (
        <Table columns={columns} pagination={false}
               dataSource={props.orders}
               onRow={(record, rowIndex) => {
                   return {
                       onClick: event => {onRowClick(record.id)},
                   };
               }}
        />
    );
}

export default OrderList;