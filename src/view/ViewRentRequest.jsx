import React from "react";
import NavBar from "../component/navbar/NavBar";
import FooterInd from "../component/footer/FooterInd";
import {Layout, Space, Table, Tag} from "antd";

const { Content } = Layout;

const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        address: 'New York No. 1 Lake Park',
        tags: ['REJECTED'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        address: 'London No. 1 Lake Park',
        tags: ['PENDING'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        address: 'Sidney No. 1 Lake Park',
        tags: ['ACCEPTED'],
    },
];

class ViewRentRequest extends React.Component {
    colorCode = (tag) => {
        if(tag === 'PENDING')
            return 'blue';
        else if(tag === 'ACCEPTED')
            return 'green';
        else
            return 'red';
    }

    render() {
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
                                        <Tag color={this.colorCode(tag)} key={tag}>
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
    }
}

ViewRentRequest.propTypes = {}
export default ViewRentRequest;