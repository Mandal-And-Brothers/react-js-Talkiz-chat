import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Sidebar from './Sidebar';

const currentDate = new Date().toLocaleDateString();

const Add = () => {
    const [User, setUser] = useState('');
    const [Data, setData] = useState([]);
    const [Page, setPage] = useState(false);
    const [disPage, setDisPage] = useState(false);
    const [cbutton, setCbutton] = useState(false);
    const [Err, setErr] = useState('');


    const getResult = () => {
        let test = localStorage.getItem('Talkiz-id');
        test = JSON.parse(test);
        if (User.length > 0) {
            if (Number(User)) {
                Axios.post("http://localhost:3055/ph-Profile", {
                    email: User,
                }).then((Response) => {
                    const uid = Response.data[0].uid;
                    Axios.post("http://localhost:3055/c-request", {
                        from_uid: test,
                        to_uid: uid
                    }).then((Responce) => {
                        if(Responce.data.length>0){
                            if (Responce.data[0].respond === 'null') {
                                setCbutton(true);
                            }
                        }
                    });
                    if (Response.data.length > 0) {
                        if (Response.data[0].uid === test) {
                            setPage(true);
                            setDisPage(true);
                        }
                        else {
                            setData(Response.data);
                            setPage(false);
                            setDisPage(true);
                        }
                    } else {
                        setPage(true);
                        setDisPage(true);
                    }
                });
            } else {
                Axios.post("http://localhost:3055/Profile", {
                    email: User,
                }).then((Response) => {

                    const uid = Response.data[0].uid;
                    Axios.post("http://localhost:3055/c-request", {
                        from_uid: test,
                        to_uid: uid
                    }).then((Responce) => {
                        if(Responce.data.length>0){
                            if (Responce.data[0].respond === 'null') {
                                setCbutton(true);
                            }
                        }
                    });

                    if (Response.data.length > 0) {
                        if (Response.data[0].uid === test) {
                            setPage(true);
                            setDisPage(true);
                        }
                        else {
                            setData(Response.data);
                            setPage(false);
                            setDisPage(true);
                        }
                    } else {
                        setPage(true);
                        setDisPage(true);
                    }
                })
            }
        }
        else {
            setDisPage(false);
            setErr("Please Enter Email or Phone No. ");
        }
    }

    function addfrnd(e) {
        let test = localStorage.getItem('Talkiz-id');
        test = JSON.parse(test);
        Axios.post("http://localhost:3055/request", {
            from_uid: test,
            to_uid: e[0].uid,
            req_date: currentDate,
            read: 'no',
            respond: 'null'
        }).then(() => {
            console.log("request send");
            setCbutton(true);
        });

    }

    function cancelfrnd(e) {
        let test = localStorage.getItem('Talkiz-id');
        test = JSON.parse(test);
        Axios.post("http://localhost:3055/cancel-request", {
            from_uid: test,
            to_uid: e[0].uid,
        }).then(() => {
            console.log("request delete");
            setCbutton(false);
        });

    }

    return (
        <div className="user-container">
            <Sidebar />
            <div className="add-content">
                <div className="add-search-div">
                    <input placeholder="Email or Phone No...." onChange={event => setUser(event.target.value)} />
                    <button onClick={getResult} style={{ cursor: 'pointer' }}>Search</button>
                </div>
                {
                    !disPage ?
                        <div>
                            {<h1>{Err}</h1>}
                        </div>
                        :
                        !Page ?
                            <div className="add-result">
                                <div className="sub-add-result">
                                    <div className="profile-pic">
                                        <AccountCircleIcon className="add-pro-pic" />
                                    </div>
                                    <div className="detail-container">
                                        <div className="details">
                                            <h2>{Data[0].name}</h2>
                                            <h4>{Data[0].city}, {Data[0].country}</h4>
                                            <h4>{Data[0].gender}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="buttons">
                                    {!cbutton ?
                                        <button style={{ cursor: 'pointer' }} onClick={() => addfrnd(Data)}>Add Friend</button>
                                        :
                                        <button style={{ cursor: 'pointer' }} onClick={() => cancelfrnd(Data)}>Cancel Request</button>
                                    }
                                    <button style={{ cursor: 'pointer' }}>Profile</button>
                                </div>
                            </div>
                            :
                            <div>
                                <h1>User not found</h1>
                            </div>
                }
            </div>
        </div>
    );
}

export default Add;
