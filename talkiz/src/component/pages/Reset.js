import React from "react"
import Login from "./Login"
import "./../Thames/Style.css";
import Axios from "axios"
import firebase from "../../server/Firebase"
import "firebase/auth"

class Reset extends React.Component {
    constructor() {
        super();
        this.state = {
            login: false,
            phone: false,
            cap: false,
            otp: '',
            uid:'',
            email: '',
            emailerr: '',
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
        //check email from data base
        if (!this.state.email.length > 0) {
            this.setState({ emailerr: "Enter email or phone number" })
        }
        else {
            return true;
        }
    }

    OTP = (e) => {
        var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        var number = '+9779810400649';
        firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
            var code = prompt('Enter the otp', '');

            if (code === null)
                return;

            e.confirm(code).then(function (result) {
                console.log(result.user.uid);
                //this.setState({uid : result.user.uid})
            });

            });
        };

        reset = (e) => {
            this.setState({ emailerr: "" })
            const { email} = this.state;
            if (this.validation()) {
                if (Number(email)) {
                    /*........getting data from database for verification.......*/
                    Axios.post("http://localhost:3055/ph-login", {
                        email: email,
                    }).then((Response) => {
                        if (Response.data.length > 0) {
                            this.setState({ cap: true });
                            this.OTP()
                            if (this.state.uid>0) {
                                this.setState({ cap: true });
                            }
                            else{
                                this.setState({ phone: true });
                            }
                        }
                        else {
                            this.setState({ emailerr: "Enter correct email or phone number" })
                        }
                    });

                }
                else {
                    /*........getting data from database for verification.......*/
                    Axios.post("http://localhost:3055/login", {
                        email: email,
                    }).then((Response) => {
                        if (Response.data.length > 0) {
                            firebase.auth().sendPasswordResetEmail(email)
                                .then(() => {
                                    alert("Email sent \nPlease reset Password");
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                        else {
                            this.setState({ emailerr: "Enter correct email or phone number" })
                        }
                    });
                }
                this.setState({
                    email: ''
                })
            }

        }
        render() {
            const { email, otp } = this.state;
            return (
                <div>
                    {
                        !this.state.login ?
                            !this.state.cap ?
                                !this.state.phone ?
                                    <div className="main">
                                        <div className="re-contaner">
                                            <div className="re-form">
                                                <label className="re-lbl">Enter Email Or Phone Number</label>
                                                <input name="email" placeholder="Email or Phone Number" ref={this.iref} value={email} onChange={this.onChange} />
                                                <h1 style={{ fontSize: 16, marginTop: -20, color: "red" }} className="text-muted">{this.state.emailerr}</h1>
                                            </div>
                                            <div className="re-btn">
                                                <button style={{ cursor: 'pointer' }} onClick={this.reset}>Reset</button>
                                                <button style={{ cursor: 'pointer' }} onClick={() => this.setState({ login: true })}>Back</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="main">
                                        <div className="re-contaner">
                                            <div className="re-form">
                                                <label className="re-lbl">Enter OTP</label>
                                                <input name="otp" placeholder="OTP" ref={this.iref} value={otp} onChange={this.onChange} />
                                                <h1 style={{ fontSize: 16, marginTop: -20, color: "red" }} className="text-muted">{this.state.emailerr}</h1>
                                            </div>
                                            <div className="re-btn">
                                                <button style={{ cursor: 'pointer' }} onClick={this.res}>Submit</button>
                                                <button style={{ cursor: 'pointer' }} onClick={() => this.setState({ phone: false })}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                :
                                <div className="main">
                                    <div className="re-contaner">
                                        <div className="re-form">
                                            <div id="recaptcha"></div>
                                        </div>
                                        <div className="re-btn">
                                            <button style={{ cursor: 'pointer' }} onClick={() => this.setState({ phone: true })}>Done</button>
                                            <button style={{ cursor: 'pointer' }} onClick={() => this.setState({ cap: false })}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            :
                            <div>
                                <Login />
                            </div>
                    }
                </div>

            );
        }

    }
    export default Reset;