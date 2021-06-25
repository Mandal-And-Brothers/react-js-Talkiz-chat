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

app.listen(3055, () => {
    console.log("server running");
});