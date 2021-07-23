import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Axios from "axios";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Notification = () => {

    const [Data, setData] = useState([]);

    useEffect(() => {
        let test = localStorage.getItem('Talkiz-id');
        test = JSON.parse(test);
        Axios.post("http://localhost:3055/get-request", {
            uid: test,
        }).then((Response) => {
            setData(Response.data);
        });
    });

    function Accept(e){
        console.log(e);
    }



    return (
        <div className="user-container">
            <Sidebar />
            <div className="content">
                {
                    Data.map((value) => {
                        return (
                            <div className="value-container">
                                <div key={value.req_from} className="fromat-container">
                                    <div className="noti-profile-pic">
                                    <AccountCircleIcon className="add-pro-pic" />
                                    </div>
                                    <h2>{value.name}</h2><label>Sent You A Friend Request.</label>
                                </div>
                                <button style={{ cursor: 'pointer' }} onClick={()=>Accept(value)}>Accept</button>
                                <button style={{ cursor: 'pointer' }}>Decline</button>
                                <button style={{ cursor: 'pointer' }}>Profile</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Notification;
