import React from "react";
import "./../Thames/Style.css";
import Register from "./Register";
import Reset from "./Reset";
import Axios from "axios";
import firebase from "../../server/Firebase";
import "firebase/auth";
import User from "./User";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            register: false,
            reset: false,
            UserPage: false,
            usr: '',
            pas: '',
            usrerr: '',
            paserr: '',
            Data: '',
            Error: ''
        }
        this.iref = React.createRef()
    }
    componentDidMount() {
        this.iref.current.focus()
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    validation = (e) => {
        if (!this.state.usr.length > 0 && this.state.pas.length < 6) {
            this.setState({ usrerr: "Fill Username", paserr: "Fill Password" })
        }
        else if (!this.state.usr.length > 0) {
            this.setState({ usrerr: "Fill Username" })
        }
        else if (!this.state.pas.length > 0) {
            this.setState({ paserr: "Fill Password" })
        }
        else if (this.state.pas.length < 6) {
            this.setState({ paserr: "Invalid Password" })
        }
        else {
            return true
        }
    }

    login = (e) => {
        this.setState({ usrerr: "", paserr: "", Error: "" });
        const { usr, pas } = this.state;
        if (this.validation()) {
            if (Number(usr)) {
                /*........getting data from database for verification.......*/
                Axios.post("http://localhost:3055/ph-login", {
                    email: usr,
                }).then((Response) => {
                    this.setState({ Data: [Response.data[0]] });
                    if (Response.data.length > 0) {
                        if (this.state.Data[0].password === pas) {
                            localStorage.setItem('Talkiz-id', JSON.stringify(this.state.Data[0].uid));
                            this.setState({ UserPage: true });
                        }
                        else {
                            this.setState({ Error: "Wrong Username And Password" });
                        }
                    }
                    else {
                        this.setState({ Error: "Wrong Username And Password" });
                    }
                });
                this.setState({
                    usr: '',
                    pas: '',
                });
            }
            else {
                /*........getting data from database for verification.......*/
                Axios.post("http://localhost:3055/login", {
                    email: usr,
                }).then((Response) => {
                    this.setState({ Data: [Response.data[0]] });

                    /*.....................password checking and verify account................................ */
                    const password = '123456';
                    if (Response.data.length > 0) {
                        if (this.state.Data[0].password === pas) {
                            if (this.state.Data[0].verify === "yes") {
                                localStorage.setItem('Talkiz-id', JSON.stringify(this.state.Data[0].uid));
                                this.setState({ UserPage: true });

                            }
                            else {
                                firebase.auth().signInWithEmailAndPassword(usr, password)
                                    .then((user) => {
                                        if (user.user.emailVerified) {
                                            console.log('email is verified');
                                            Axios.post("http://localhost:3055/up-verify", {
                                                email: usr,
                                                verify: 'yes'
                                            }).then(() => {
                                                console.log("login data inserted");
                                                localStorage.setItem('Talkiz-id', JSON.stringify(this.state.Data[0].uid));
                                                this.setState({ UserPage: true });
                                            });
                                        } else {
                                            user.user.sendEmailVerification()
                                            alert("Email sent \nPlease Verify Your Email");
                                        }
                                    }).catch((error) => { console.log(error); });

                                firebase.auth().signOut().then(() => {
                                }).catch((error) => {
                                    console.log(error);
                                });
                            }
                        }
                        else {
                            /*.....................after using forgot password update password in database.......................... */
                            firebase.auth().signInWithEmailAndPassword(usr, pas)
                                .then((user) => {
                                    if (user.user.emailVerified) {
                                        console.log('email is verified');
                                        Axios.post("http://localhost:3055/up-verify", {
                                            email: usr,
                                            verify: 'yes'
                                        }).then(() => {
                                            console.log("login verify updated");
                                        });
                                        Axios.post("http://localhost:3055/up-password", {
                                            email: usr,
                                            password: pas
                                        }).then(() => {
                                            console.log("login password updated");
                                        });
                                        localStorage.setItem('Talkiz-id', JSON.stringify(this.state.Data[0].uid));
                                        this.setState({ UserPage: true });
                                    } else {
                                        user.user.sendEmailVerification()
                                        Axios.post("http://localhost:3055/up-password", {
                                            email: usr,
                                            password: pas
                                        }).then(() => {
                                            console.log("login password updated");
                                        });
                                        alert("Email sent \nPlease Verify Your Email");
                                    }
                                    const newPassword = '123456';
                                    user.user.updatePassword(newPassword).then(() => {
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch((error) => {
                                    console.log(error);
                                    this.setState({ Error: "Wrong Username And Password" });
                                });
                            firebase.auth().signOut().then(() => {
                            }).catch((error) => {
                                console.log(error);
                            });

                        }
                    }
                    else {
                        this.setState({ Error: "Wrong Username And Password" });
                    }
                });

                this.setState({
                    usr: '',
                    pas: '',
                });
            }
        }

    }


    render() {
        const { usr, pas } = this.state;
        return (
            <div>
                {
                    !this.state.UserPage ?
                        !this.state.register ?

                            !this.state.reset ?
                                <div className="main">
                                    <div className="contaner">
                                        <div className="header">Login</div>

                                        <div className="form">
                                            <h1 style={{ fontSize: 16, marginTop: -20, color: "red" }}>{this.state.Error}</h1>
                                            <div className="user">
                                                <label className="lbl">Username :</label>
                                                <input name="usr" placeholder="Email or Phone Number" ref={this.iref}
                                                    value={usr} onChange={this.onChange} />
                                                <h1 style={{ fontSize: 16, marginTop: -20, color: "red" }} className="text-muted">{this.state.usrerr}</h1>
                                            </div>
                                            <div className="pass">
                                                <label className="lbl">Password :</label>
                                                <input type="password" name="pas" placeholder="Password"
                                                    value={pas}
                                                    onChange={this.onChange} />
                                                <h1 style={{ fontSize: 16, marginTop: -20, color: "red" }} className="text-muted">{this.state.paserr}</h1>
                                            </div>
                                        </div>
                                        <div className="btn">
                                            <button onClick={this.login} style={{ cursor: 'pointer' }}>Login</button>
                                            <div className="forgt">
                                                <label onClick={() => this.setState({ reset: true })} style={{ cursor: 'pointer' }}>Forget Password ?</label>
                                            </div>
                                            <button className="reg" style={{ cursor: 'pointer' }} onClick={() => this.setState({ register: true })}>Create a new account</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div>
                                    <Reset />
                                </div>

                            :
                            <div>
                                <Register />
                            </div>
                        :
                        <div>
                            <User/>
                        </div>
                }
            </div>

        );
    }

}
export default Login;