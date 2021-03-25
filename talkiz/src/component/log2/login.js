import React from "react"
import "./login.css"

class Login extends React.Component
{
    render(){
        return(
            <dev className="main">
            <div className="contaner">
            <div className="body">
            <div className="header">Login</div>

            <div className="form">
            <div className="user">
            <label>Username :</label>
            <input name="username" placeholder="username"/>
            </div>
            <div className="pass">
            <label>Password :</label>
            <input type="password" name="password" placeholder="password" />
            </div>
            </div>
            <dev className="btn">
            <button>Login</button>
            </dev>
            </div>
            </div>
            </dev>
            
        );
    }

}
export default Login;