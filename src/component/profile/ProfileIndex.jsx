import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {SERVER_LOC} from "../../constant/Data";
import {message} from "antd";
import BillingAddress from "./BillingAddress";
import UserInfo from "./UserInfo";
import PaymentDetail from "./PaymentDetail";
import {useNavigate} from "react-router-dom";

const ProfileIndex = (props) => {
    const navigate = useNavigate();
    const authenticate = useSelector(state => state.authenticate);
    const [userInfo, setUserInfo] = useState({id:0, firstname:'', middlename:'', lastname:''});
    const [billingAdd, setBillingAdd] = useState({id:0, address:'', city:'', state:'', contactNo:''});
    const [isBuyer, setIsBuyer] = useState(false);
    const [completedCount, setCompletedCount] = useState(0);

    const fetchUserInfo = () => {
        fetch(SERVER_LOC + "/user/" + authenticate.userId , {
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
                let userInfo = {id:result.id, firstname:result.firstname,
                    middlename:result.middlename, lastname:result.lastname};

                setUserInfo(userInfo);
                if(result.billingAddress !== null)
                    setBillingAdd(result.billingAddress);
            });
    };

    const getUserPoints = () => {
        fetch(SERVER_LOC + "/order/user/" + authenticate.userId +"/count/completed" , {
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
                setCompletedCount(result.count);
            });
    };

    useEffect(() => {
        if(authenticate.token === ''){
            navigate('/');
        }

        if(authenticate.userId !== 0){
            fetchUserInfo();
            setIsBuyer(authenticate.roles[0]==='BUYER');
            getUserPoints();
        }
    }, []);

    return (
        <>
            {
                isBuyer?
                    <div style={{fontSize:20, textAlign:'center', borderBottom:'1px solid black', marginBottom:'20px'}}>
                        <h2>Buying Points</h2>
                        <p>Completed Order: {completedCount}</p>
                        <p>Earned Points: {completedCount * 10}</p>
                    </div> :
                    <></>
            }
            <UserInfo info={userInfo}  authenticate={authenticate}/>
            {
                isBuyer?
                    <>
                        <BillingAddress address={billingAdd}  authenticate={authenticate}/>
                        <PaymentDetail authenticate={authenticate}/>
                    </> :<></>
            }

        </>
    );
}

export default ProfileIndex;