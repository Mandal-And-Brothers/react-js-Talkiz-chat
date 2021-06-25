import React from 'react';
import { useState } from 'react';
import Sidebar from './Sidebar';

const Add = () => {
    const [User, setUser] = useState();

    const getResult = () => {
        console.log(User);
    }

    return (
        <div className="user-container">
            <Sidebar />
            <div className="add-content">
                <div className="add-search-div">
                    <input placeholder="Email or Phone No...." onChange={event => setUser(event.target.value)} />
                    <button onClick={getResult} style={{ cursor: 'pointer' }}>Search</button>
                </div>
                <div className="add-result">
                    <div className="sub-add-result">
                        <div className="profile-pic">
                        </div>
                        <div className="detail-container">
                            <label>Full Name</label>
                            <div className="details"></div>
                        </div>
                    </div>
                    <button>Add Friend</button>
                </div>

            </div>
        </div>
    );
}

export default Add;
