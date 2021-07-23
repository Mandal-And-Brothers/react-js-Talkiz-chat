import React from 'react';
import { useState, useEffect } from 'react';
import "./../Thames/UserStyle.css";
import DetailsIcon from '@material-ui/icons/Details';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Friends from './Friends';
import Profile from './Profile';
import Setting from './Setting';
import { createBrowserHistory } from 'history'
import About from './About';
import { Link } from 'react-router-dom';
import Login from './Login';
import ErrorPage from './ErrorPage';
import Add from './Add';
import Axios from "axios";
import Notification from './Notification';

export const history = createBrowserHistory();

const User = () => {

    const [check, setCheck] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        let test = localStorage.getItem('Talkiz-id');
        test = JSON.parse(test);
        Axios.post("http://localhost:3055/check-request", {
            uid: test,
            read: 'no'
        }).then((Responce) => {
            if (Responce.data.length > 0) {
                setNotification(Responce.data.length);
            }
            else {
                setNotification(null);
            }
        });
    });

    const out = () => {
        localStorage.removeItem('Talkiz-id');
        setCheck(true);
        history.push("/")

    };

    return (
        <div>
            {
                !check ?
                    <Router>
                        <div className="usermain">
                            <div className="user-header">
                                <div className="UserHeader-main">
                                    <div className="Logo">
                                        <label style={{ color: "white" }}>Tz</label>
                                    </div>
                                    <div>
                                        <label className="header-name">Talkiz</label>
                                    </div>
                                    <div className="search-div">
                                        <input className="header-search" placeholder="Search Friends..." />
                                        <button className="button-search" style={{ cursor: 'pointer' }}>Search</button>
                                    </div>
                                    <nav>
                                        <ul className="nav-links">
                                            <Link to="/friends" style={{ textDecoration: 'none' }}><li>Friends</li></Link>
                                            <Link to="/add-friends" style={{ textDecoration: 'none' }}><li>Add Friends</li></Link>
                                            <Link to="/massages" style={{ textDecoration: 'none' }}><li>Massages</li></Link>
                                            <Link to="/notifications" style={{ textDecoration: 'none' }}><li>Notification<label style={{ color: "red", fontSize: 20 }}>{notification}</label></li></Link>
                                        </ul>
                                    </nav>
                                    <div className="header-profile">
                                        <AccountCircleIcon className="pro-pic" />
                                    </div>
                                    <div className="dropdown">
                                        <DetailsIcon style={{ height: 20, width: 25, textalign: 'left', cursor: 'pointer' }} className="dropbtn" />
                                        <div className="dropdown-content">
                                            <ul>
                                                <Link to="/profile" style={{ textDecoration: 'none' }}><li>Profile</li></Link>
                                                <Link to="/setting" style={{ textDecoration: 'none' }}><li>Setting</li></Link>
                                                <Link to="/about" style={{ textDecoration: 'none' }}><li>About</li></Link>
                                                <li onClick={out} style={{ cursor: 'pointer' }}>SignOut</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Switch>
                                <Route path="/" exact component={Chats} />
                                <Route path="/massages" exact component={Chats} />
                                <Route path="/friends" component={Friends} />
                                <Route path="/add-friends" component={Add} />
                                <Route path="/profile" component={Profile} />
                                <Route path="/Setting" component={Setting} />
                                <Route path="/about" component={About} />
                                <Route path="/notifications" component={Notification} />
                                <Route component={ErrorPage} />
                            </Switch>

                        </div>
                    </Router>
                    :
                    <Login />
            }
        </div>
    );
};


export default User;
