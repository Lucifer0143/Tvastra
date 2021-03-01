const dbconn = require("../databases/sqlite.js");
const session = require("express-session");
// const Lists = dbconn.Lists;
const User = dbconn.User;
const path = require("path");
const { endianness } = require("os");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "../databases/database.sqlite"));
const app = require('express')()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const Nexmo = require('nexmo')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
nunjucks.configure('views', { express: app })
const nexmo = new Nexmo({
    apiKey: '10bc7540',
    apiSecret: 'rlrqnz8UEXHQ38hU'
});


function signup(req, res) {
    const { name, email, password, gender, dob, phoneNo, city, state, country } = req.body;
    if (!(name && email && password && gender && dob && phoneNo && city && state && country)) {
        return res.render("signup", {
            areValid: true,
            isValid: false
        });
    } else {
        User.create({
            name,
            email,
            password,
            gender,
            dob,
            phoneNo,
            city,
            state,
            country
        }).then(user => {
            req.session.userId = user.id;
            if (user) {
                res.cookie(req.session.userId);
                return res.redirect('/');
            }
        }).catch(err => {
            return res.render("signup", {
                isValid: true,
                areValid: false
            })
        });
    }
};

function signin(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.redirect("/signin");
    } else {
        User.findOne({
            where: {
                email: email,
                password: password
            }
        }).then(data => {
            req.session.userId = data.id;
            res.cookie(req.session.userId);
            let userId = req.session.userId;
            let usersName, usersNo;
            let sql = "SELECT name, phoneNo FROM users WHERE id = ?";
            db.all(sql, [userId], (err, row) => {
                if (err) {
                    throw err
                }
                row.forEach((row) => {
                    usersName = row.name;
                    usersNo = row.phoneNo;
                });
                return res.render('profile', {
                    isValid: true,
                    userName: usersName,
                    userPhoneNo: usersNo
                })
            });
        }).catch(() => {
            return res.render("signin", {
                isValid: false
            });
        });
    }
};

function signOut(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/");
        }
        res.clearCookie();
        return res.redirect("/signin");
    });
};


function signin_otp(req, res) {
    res.render('/otp/:123456789')
};

function otp(req, res) {
    nexmo.verify.check({
        request_id: req.body.requestId,
        code: req.body.code
    }, (error, result) => {
        if (result.status != 0) {
            res.render('otp', { message: result.error_text })
        } else {
            req.session.userId = data.id;
            res.cookie(req.session.userId);
            let userId = req.session.userId;
            let usersName, usersNo;
            let sql = "SELECT name, phoneNo FROM users WHERE id = ?";
            db.all(sql, [userId], (err, row) => {
                if (err) {
                    throw err
                }
                row.forEach((row) => {
                    usersName = row.name;
                    usersNo = row.phoneNo;
                });
                return res.render('profile', {
                    isValid: true,
                    userName: usersName,
                    userPhoneNo: usersNo
                })
            })
        }
    })
};

module.exports = {
    signup: signup,
    signin: signin,
    signOut: signOut,
    signin_otp: signin_otp,
    otp: otp
};