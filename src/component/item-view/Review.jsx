import React, {createRef, useEffect, useRef, useState} from 'react';
import {Button, Comment, Form, Input, message, Tooltip} from "antd";
import {SERVER_LOC} from "../../constant/Data";

const { TextArea } = Input;

const Review = (props) => {
    const form = useRef(null);
    const showCommentBox = props.authenticate.token!=='' && props.authenticate.roles[0]==='BUYER';
    const [reviews, setReviews] = useState([]);

    const fetchReviews = () => {
        fetch(SERVER_LOC + "/review/product/" + props.id, {
                method: 'GET',
                headers: {
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
                setReviews(result)
            });
    };

    const postReview = async (values) => {
        let data = {userId:props.authenticate.userId, comment: values.review, productId:props.id};

        let response = await fetch(SERVER_LOC + '/review', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let status = response.status;
        let result = await response.json();

        if(status === 201){
            message.success(result.message);
            fetchReviews();
            form.current.setFieldsValue({
                review: ''
            });
        }
        else{
            message.error(result.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="review-div">
            <h2>Review</h2>
            <div className="review-display">
                {
                    reviews.map((rev, ind) =>
                        <Comment
                            className="user-review"
                            author={`${rev.user.firstname} ${rev.user.middlename} ${rev.user.lastname}`}
                            content={
                                <p>
                                    {rev.comment}
                                </p>
                            }
                            datetime={
                                <Tooltip title={rev.createdDate}>
                                    {rev.createdDate}
                                </Tooltip>
                            }
                        />
                    )
                }
            </div>

            {
                showCommentBox?
                    <div className="review-area">
                        <Form
                            name="normal_login"
                            ref={form}
                            className="review-form"
                            onFinish={postReview}
                        >
                            <Form.Item
                                name="review"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Must not be empty',
                                    },
                                ]}
                            >
                                <TextArea className="review-box" rows={7}/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Post
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>:<></>
            }
        </div>
    );
}

export default Review;