import React from 'react';
import Sidebar from './Sidebar';

const Profile = () => {
    return (
        <div className="user-container">
            <Sidebar />
            <div className="content">
                <h1>This is profile page.......</h1>
            </div>
        </div>
    );
}

export default Profile;
