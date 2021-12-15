import React, {useEffect, useState} from 'react';
import {SERVER_LOC} from "../../constant/Data";
import {Button, Card, List, message} from "antd";
import {useSelector} from "react-redux";

const {Meta} = Card;

const ApproveReviewIndex = () => {
    const authenticate = useSelector(state => state.authenticate);
    const [reviews, setReviews] = useState([]);

    const fetchReviews = () => {
        fetch(SERVER_LOC + "/review/unapproved", {
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
                setReviews(result);
            });
    };

    const approveReview = async (id) => {
        let response = await fetch(SERVER_LOC + '/review/approve/' + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        });

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success(result.message);
            fetchReviews();
        }
        else{
            message.error(result.message);
        }
    };

    const disapproveReview = async (id) => {
        let response = await fetch(SERVER_LOC + '/review/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        });

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success(result.message);
            fetchReviews();
        }
        else{
            message.error(result.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <>
            <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={reviews}
                  renderItem={item => (
                      <List.Item
                          key={item.id}
                          actions={[
                              <Button type="primary" onClick={() => approveReview(item.id)}>Approve</Button>,
                              <Button type="danger" onClick={() => disapproveReview(item.id)}>Disapprove</Button>
                          ]}
                          extra={
                              <img
                                  width={272}
                                  alt="logo"
                                  src={SERVER_LOC + item.product.productImages[0].imageUrl}
                              />
                          }
                      >
                          <List.Item.Meta
                              title={item.user.firstname + ' ' + item.user.middlename + ' ' + item.user.lastname
                                  + ' (' + item.user.username + ')'}
                              description={'Product Name: ' + item.product.name}
                          />
                          Review: {item.comment}
                      </List.Item>
                  )}
            />
        </>
    );
}

export default ApproveReviewIndex;