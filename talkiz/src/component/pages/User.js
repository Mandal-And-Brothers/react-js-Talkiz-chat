import React from 'react';
import { useState } from 'react';
import "./../Thames/UserStyle.css";
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Friends from './Friends';
import Profile from './Profile';
import Setting from './Setting';
import { createBrowserHistory } from 'history'
import About from './About';
import { Link } from 'react-router-dom';
import Login from './Login';
import ErrorPage from './ErrorPage';
import Add from './Add';

export const history = createBrowserHistory();

const User = () => {

    const [check, setCheck] = useState(false);

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
                                            <li>Notification</li>
                                        </ul>
                                    </nav>
                                    <div className="header-profile">
                                    </div>
                                    <div className="dropdown">
                                        <button style={{ height: 20, width: 25, textalign: 'left',cursor: 'pointer'  }} className="dropbtn">{'>'}</button>
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
                                <Route path="/add-friends" component={Add}/>
                                <Route path="/profile" component={Profile} />
                                <Route path="/Setting" component={Setting} />
                                <Route path="/about" component={About} />
                                <Route component={ErrorPage}/>
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
