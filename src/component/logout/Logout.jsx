import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {deleteToken} from "../../redux/AuthenticateReducer";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(deleteToken());
        navigate("/");
    };

    useEffect(() => {
        logout();
    });

    return (
        <></>
    );
}

export default Logout;