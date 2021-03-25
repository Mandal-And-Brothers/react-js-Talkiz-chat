import React from "react";
import img from "./../../logo.svg";
import "./style.css";

export class Login extends React.Component 
{
  render() 
  {
    return(
    <dev className="contaner">

      <dev className="header"> <h1>Login</h1></dev>

      <dev className="body">

        <dev className="logo">
          <img src={img} alt="logo"/>
        </dev>

        <dev className="form">
          <label>Username</label>
          <input type="text" name="username" placeholder="Username"></input>
        </dev>

        <dev className="form">
           <label >Password</label>
          <input type="password" name="password" placeholder="password"></input>
        </dev>
      </dev>

      <dev className="footer">
       <button type="btn" className="button">Signin</button>
      </dev>

    </dev>
    );
  }
}
export default Login;