import React, {useState} from "react";
import FooterInd from "../../../component/footer/FooterInd.jsx";
import NavBar from "../../../component/navbar/NavBar";
import {Layout, Space, Table, Tag} from "antd";

const { Content } = Layout;

const { Column, ColumnGroup } = Table;
const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        address: 'New York No. 1 Lake Park',
        tags: ['SHIPMENT DELAYED'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        address: 'London No. 1 Lake Park',
        tags: ['SHIPPED'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        address: 'Sidney No. 1 Lake Park',
        tags: ['DELIVERED'],
    },
];
const colorCode = (tag) => {
    if(tag === 'SHIPPED')
        return 'blue';
    else if(tag === 'DELIVERED')
        return 'green';
    else
        return 'red';
};
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const ApproveSeller = () => {


    const [selectionType, setSelectionType] = useState('checkbox');
    return (
        <Layout>
            <NavBar/>

            <Content className="main-body">
                <Table dataSource={data}>
                    <ColumnGroup title="Name">
                        <Column title="First Name" dataIndex="firstName" key="firstName" />
                        <Column title="Last Name" dataIndex="lastName" key="lastName" />
                    </ColumnGroup>
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={tags => (
                            <>
                                {tags.map(tag => (
                                    <Tag color={colorCode(tag)} key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <a>Accept</a>
                                <a>Reject</a>
                            </Space>
                        )}
                    />
                </Table>
            </Content>
            <FooterInd/>
        </Layout>
    )
};
ApproveSeller.propTypes = {}

export default ApproveSeller;