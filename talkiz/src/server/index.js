const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'talkiz'
});

db.connect((error) => {
    if (error) {
        console.log(error)
    } else { console.log("mysql connected..") }
});

/*..................for register new user..................*/

app.post("/create", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const pass = req.body.pass;
    const uid = req.body.uid;
    const verify = req.body.verify;
    db.query(
        "INSERT INTO `login`(`name`, `email`, `phone`, `password`, `uid`, `verify`) VALUES (?,?,?,?,?,?)",
        [name, email, phone, pass, uid, verify], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("values inserted");
            }
        }
    );
});

/*........................for update verification of user using email.....................*/
app.post("/up-verify", (req, res) => {
    const email = req.body.email;
    const verify = req.body.verify;
    db.query(
        " UPDATE `login` SET `verify`='" + verify + "' WHERE `email`='" + email + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("values inserted");
            }
        }
    );
});

/*........................for update password of user after forget password.....................*/
app.post("/up-password", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        " UPDATE `login` SET `password`='" + password + "' WHERE `email`='" + email + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("values inserted");
            }
        }
    );
});

/*...........................for login verification..........................*/
app.post("/login", (req, res) => {
    const email = req.body.email;
    db.query(
        "SELECT * FROM `login` WHERE `email`=?", [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for login using number..........................*/
app.post("/ph-login", (req, res) => {
    const email = req.body.email;
    db.query(
        "SELECT * FROM `login` WHERE `phone`=?", [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for search profile with number.............................*/
app.post("/ph-Profile", (req, res) => {
    const email = req.body.email;
    db.query(
        "SELECT login.name,login.uid,profile.country,profile.city, profile.bio, profile.dob, profile.gender, profile.phone, profile.email FROM `login`,`profile` WHERE login.uid=profile.uid AND login.phone=?", [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for search profile with email.............................*/
app.post("/Profile", (req, res) => {
    const email = req.body.email;
    db.query(
        "SELECT login.name,login.uid,profile.country,profile.city, profile.bio, profile.dob, profile.gender, profile.phone, profile.email FROM `login`,`profile` WHERE login.uid=profile.uid AND login.email=?", [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*..................for send request ..................*/

app.post("/request", (req, res) => {
    const from_uid = req.body.from_uid;
    const to_uid = req.body.to_uid;
    const req_date = req.body.req_date;
    const read = req.body.read;
    const respond=req.body.respond;
    db.query(
        "INSERT INTO `Notification`(`req_to`, `req_from`, `req_date`, `req_read`, `respond`) VALUES (?,?,?,?,?)",
        [to_uid, from_uid, req_date, read, respond], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("values inserted");
            }
        }
    );
});

/*...........................for notification for  cancel req button.............................*/
app.post("/c-request", (req, res) => {
    const from_uid = req.body.from_uid;
    const to_uid = req.body.to_uid;
    db.query(
        "SELECT `req_to`, `req_from`, `req_date`, `req_read`, `respond` FROM `Notification` WHERE `req_to`='" + to_uid + "' AND `req_from`='" + from_uid + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for notification for  cancel reqquest.............................*/
app.post("/cancel-request", (req, res) => {
    const from_uid = req.body.from_uid;
    const to_uid = req.body.to_uid;
    db.query(
        "DELETE FROM `Notification` WHERE `req_to`='" + to_uid + "' AND `req_from`='" + from_uid + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for checking notification..................................................*/
app.post("/check-request", (req, res) => {
    const uid = req.body.uid;
    const read = req.body.read;
    db.query(
        "SELECT `req_to`, `req_from`, `req_date`, `req_read`, `respond` FROM `Notification` WHERE `req_to`='" + uid + "' AND `req_read`='" + read + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

/*...........................for notification page..................................................*/
app.post("/get-request", (req, res) => {
    const uid = req.body.uid;
    db.query(
        "SELECT login.name,Notification.req_to, Notification.req_from, Notification.req_date, Notification.req_read, Notification.respond FROM `login`,`Notification` WHERE login.uid=Notification.req_from AND Notification.req_to='" + uid + "'", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
});

app.listen(3055, () => {
    console.log("server running");
});