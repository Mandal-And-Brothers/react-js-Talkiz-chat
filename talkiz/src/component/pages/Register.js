import React from "react"
import "./../Thames/Style.css";
import Login from "./Login"
import firebase from "../../server/Firebase"
import "firebase/auth"
import Axios from "axios"

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            login: false,
            full: '',
            box: null,
            boxval: '',
            email: '',
            passw: '',
            repassw: '',
            fullerr: '',
            emailerr: '',
            repasswerr: '',
            passwerr: '',
            boxerr: ''
        }
        this.iref = React.createRef()
    }
    componentDidMount() {
        this.iref.current.focus()
    }

    handleChange = box => {
        this.setState({ boxval: box.Value });
    };


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    };

    validation = (e) => {
        if (!this.state.full.length > 0 && !this.state.email.length > 0 && !this.state.passw.length > 0 && !this.state.boxval.length > 0) {
            this.setState({ fullerr: "Enter Full Name", emailerr: "Enter Email or Phone", passwerr: "Enter Password", boxerr: "Select Verification Mode" })
        }
        else if (!this.state.full.length > 0) {
            this.setState({ fullerr: "Enter Full Name" })
        }
        else if (/[0-9]/.test(this.state.full)) {
            this.setState({ fullerr: "Incorrect Full Name" })
        }
        else if (!this.state.boxval.length > 0) {
            this.setState({ boxerr: "Select Verification Mode" })
        }
        else if (this.state.boxval === "Email" && !this.state.email.length > 0) {
            this.setState({ emailerr: "Enter Email" })
        }
        else if (this.state.boxval === "Email" && !this.state.email.match("@.")) {
            this.setState({ emailerr: "Incorrect Email" })
        }
        else if (this.state.boxval === "Phone" && !this.state.email.length > 0) {
            this.setState({ emailerr: "Enter Phone number" })
        }
        else if (this.state.boxval === "Phone" && !Number(this.state.email)) {
            this.setState({ emailerr: "Incorrect Phone number" })
        }
        else if (this.state.boxval === "Phone" && this.state.email.length > 10) {
            this.setState({ emailerr: "Incorrect Phone number" })
        }
        else if (this.state.boxval === "Phone" && this.state.email.length < 10) {
            this.setState({ emailerr: "Incorrect Phone number" })
        }
        else if (!this.state.passw.length > 0) {
            this.setState({ passwerr: "Enter Password" })
        }
        else if (this.state.passw.length < 6) {
            this.setState({ passwerr: "Password Must Consist Morethan 6 characters" })
        }
        else if (!this.state.repassw.length > 0) {
            this.setState({ repasswerr: "Enter Re-Password" })
        }
        else if (this.state.repassw !== this.state.passw) {
            this.setState({ repasswerr: "Password Didn't Matched" })
        }
        else {
            return true
        }
    }

    register = (e) => {
        this.setState({ fullerr: "", emailerr: "", passwerr: "", repasswerr: "", boxerr: "" })
        const { full, email, passw } = this.state;
        if (this.validation()) {
            /*Email verification..........................................*/
            if (this.state.boxval === "Email") {

                const password = '123456';
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                        // send verification mail.
                        user.user.sendEmailVerification()
                        const uid = user.user.uid;
                        Axios.post("http://localhost:3055/create", {
                            name: full,
                            email: email,
                            phone: '',
                            pass: passw,
                            uid: uid,
                            verify: 'No'
                        }).then(() => {
                            console.log("login data inserted");
                        });
                        alert("Email sent");


                    }).catch(function (error) {
                        console.log(error.message);
                        firebase.auth().onAuthStateChanged((user) => {
                            console.log(user.emailVerified);
                            if (user.emailVerified) {
                                console.log('email is verified')
                                document.querySelector('label').textContent += error.message;
                                Axios.post("http://localhost:3055/up-verify", {
                                    email: email,
                                    verify: 'yes'
                                }).then(() => {
                                    console.log("login data inserted");
                                });
                            } else {
                                console.log('email not verified')
                                document.querySelector('label').textContent += error.message;
                                user.sendEmailVerification()
                                alert("Email sent \nPlease Verify");
                                console.log(user);
                            }
                        });
                    });
            }
            else {
                //number verification..................................
                var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
                const num = this.state.email;
                console.log(recaptcha);
                var number = '+977' + num;
                firebase.auth().signInWithPhoneNumber(number, recaptcha).then(function (e) {
                    var code = prompt('Enter the otp', '');


                    if (code === null)
                        return;

                    e.confirm(code).then(function (result) {
                        const uid = result.user.uid;
                        Axios.post("http://localhost:3055/create", {
                            name: full,
                            email: '',
                            phone: email,
                            pass: passw,
                            uid: uid,
                            verify: 'yes'
                        }).then(() => {
                            console.log("login data inserted");
                        });

                    }).catch(function (error) {
                        console.error(error.code);
                        alert(error.code);
                    });

                })
                    .catch(function (error) {
                        console.log(error.code);
                        alert(error.code);

                    });
            }
            this.setState({
                full: '',
                boxval: '',
                email: '',
                passw: '',
                repassw: '',
            });
        }
    }

    render() {
        const { full, boxval, email, repassw, passw } = this.state;
        return (
            <div>
                {
                    !this.state.login ?
                        <div className="main">
                            <div className="contaner">

                                <div className="header">Sign Up</div>

                                <div className="form1">

                                    <label style={{ fontSize: 14, marginTop: -33, color: "red" }}></label>
                                    <input name="full" type="text" placeholder="Full Name" ref={this.iref} value={full} onChange={this.onChange} />
                                    <h1 style={{ fontSize: 14, marginTop: -33, color: "red" }} className="text-muted">{this.state.fullerr}</h1>

                                    <select name="boxval" value={boxval} onChange={this.onChange} className="select" isSearchable >
                                    <option hidden>Select Verification Mode</option>
                                    <option value='Email'>Email</option>
                                    <option value='Phone'>Phone Number</option>
                                    </select>
                                    <h1 style={{ fontSize: 14, marginTop: -33, color: "red" }} className="text-muted">{this.state.boxerr}</h1>

                                    <input name="email" placeholder={boxval} value={email} onChange={this.onChange} />
                                    <h1 style={{ fontSize: 14, marginTop: -33, color: "red" }} className="text-muted">{this.state.emailerr}</h1>


                                    <input type="password" name="passw" placeholder="Password" value={passw} onChange={this.onChange} />
                                    <h1 style={{ fontSize: 14, marginTop: -33, color: "red" }} className="text-muted">{this.state.passwerr}</h1>

                                    <input type="password" name="repassw" placeholder="Re-Password" value={repassw} onChange={this.onChange} />
                                    <h1 style={{ fontSize: 14, marginTop: -33, color: "red" }} className="text-muted">{this.state.repasswerr}</h1>

                                    <div id="recaptcha"></div>
                                </div>
                                <div className="btn1">
                                    <button style={{ cursor: 'pointer' }} onClick={this.register}>Sign Up</button>
                                    <button className="reg" style={{ cursor: 'pointer' }} onClick={() => this.setState({ login: true })}>Already have an account ?</button>
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
export default Register;