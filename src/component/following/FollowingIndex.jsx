import React, {useEffect, useState} from 'react';
import {SERVER_LOC} from "../../constant/Data";
import {Button, Card, message} from "antd";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import './style.css';

const FollowingIndex = () => {
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const [sellers, setSellers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followingUsernames, setFollowingUsernames] = useState([]);

    const fetchAllSellers = () => {
        fetch(SERVER_LOC + "/user/get-all/sellers", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res=> {
                if(res.status === 200){
                    return res.json();
                }
                else message.error("Error.");
            })
            .then(result => {
                setSellers(result);
            });
    };

    const fetchAllFollowing = () => {
        fetch(SERVER_LOC + "/user/" + authenticate.userId + "/following", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + authenticate.token,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(res=> {
                if(res.status === 200){
                    return res.json();
                }
                else message.error("Error.");
            })
            .then(result => {
                let usernames = result.map(res => res.following.username);
                setFollowing(result);
                setFollowingUsernames(usernames);
            });
    };

    const getFollowingId = (username) =>{
        let follow = following.filter(fol => fol.following.username===username)[0];
        return follow.id;
    };

    const unfollow = async (username) => {
        let response = await fetch(SERVER_LOC + '/user/following/' + getFollowingId(username), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            }
        });

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.info("Unfollowed Successful.");
            fetchAllSellers();
            fetchAllFollowing();
        }
        else{
            message.error(result.message);
        }
    };

    const follow = async (sellerId) => {
        let data = {userId: authenticate.userId, followingId:sellerId};

        let response = await fetch(SERVER_LOC + '/user/following', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + authenticate.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        let status = response.status;
        let result = await response.json();

        if(status === 200){
            message.success("Followed Successful.");
            fetchAllSellers();
            fetchAllFollowing();
        }
        else{
            message.error(result.message);
        }
    };

    useEffect(() => {
        if(authenticate.token === '' || authenticate.roles[0] !== 'BUYER')
            navigate('/');

        if(authenticate.userId !== 0){
            fetchAllSellers();
            fetchAllFollowing();
        }
    }, []);

    return (
        <div className="following-div">
            {
                sellers.map(seller => <>
                    <Card className="following-card" key={seller.id} title={seller.username} style={{ width: 300 }}>
                        <p>First Name : {seller.firstname}</p>
                        <p>Middle Name : {seller.middlename}</p>
                        <p>Last Name : {seller.lastname}</p>
                        <p>Username : {seller.username}</p>

                        {
                            followingUsernames.includes(seller.username) ?
                                <Button size='large' type='danger' onClick={() => unfollow(seller.username)}>Unfollow</Button>:
                                <Button size='large' type='primary' onClick={() => follow(seller.id)}>Follow</Button>
                        }
                    </Card>
                </>)
            }
        </div>
    );
}

export default FollowingIndex;