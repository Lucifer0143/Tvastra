const dbconn = require("../databases/sqlite.js");
const session = require("express-session");
// const Lists = dbconn.Lists;
const User = dbconn.User;
const path = require("path");
const { endianness } = require("os");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "../databases/database.sqlite"));
// const app = require('express')()
// const bodyParser = require('body-parser')
// const nunjucks = require('nunjucks')
// const Nexmo = require('nexmo')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// nunjucks.configure('views', { express: app })
// const nexmo = new Nexmo({
//     apiKey: '10bc7540',
//     apiSecret: 'rlrqnz8UEXHQ38hU'
// });
const OtpManager = require('./OtpManager');
const otpRepository = require("./otpRepository");
const otpSender = require("./otpSender")
const otpManager = new OtpManager(otpRepository, { otpLength: 4, validityTime: 5 });
let url;


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
        console.log('this is signin')
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
    const otp = otpManager.create(req.params.token);
    const { phoneNo } = req.body;
    console.log(phoneNo);
    User.findOne({
        where: {
            phoneNo: phoneNo
        }
    }).then(data => {
        console.log(data.phoneNo);
        otpSender.send(otp, phoneNo);
        url = '/otp/:123456/' + otp.code;
        res.render('otps', {
            isValid: false,
            areValid: true,
            nonValid: false,
            name: data.name,
            phoneNo: data.phoneNo
        });
    }).catch(err => {
        res.render('signin_otp', {
            isValid: true
        })
    })

};

function otps(req, res) {
    const { codeBox1, codeBox2, codeBox3, codeBox4 } = req.body;
    const num = codeBox1 + codeBox2 + codeBox3 + codeBox4;
    const { name, phoneNo } = req.body;
    const verificationResults = otpManager.VerificationResults;
    const verificationResult = otpManager.verify(':123456', num);
    let statusCode;
    let bodyMessage;

    switch (verificationResult) {
        case verificationResults.valid:
            statusCode = 200;
            // bodyMessage = "OK";
            res.render('profile', {
                isValid: true,
                userName: name,
                userPhoneNo: phoneNo
            });
            break;
        case verificationResults.notValid:
            statusCode = 404;
            // bodyMessage = "Not found"
            res.render('otps', {
                isValid: true,
                areValid: false,
                nonValid: false,
                phoneNo: phoneNo,
                name: name
            });
            break;
        case verificationResults.checked:
            statusCode = 409;
            // bodyMessage = "The code has already been verified";
            res.render('profile', {
                isValid: true,
                userName: name,
                userPhoneNo: phoneNo
            });
            break;
        case verificationResults.expired:
            statusCode = 410;
            // bodyMessage = "The code is expired";
            res.render('otps', {
                isValid: false,
                areValid: false,
                nonValid: true,
                phoneNo: phoneNo,
                name: name
            });
            break;
        default:
            statusCode = 404;
            bodyMessage = "The code is invalid for unknown reason";
    }
    res.status(statusCode).send(bodyMessage);
};

function forgotPass(req, res) {
    const otp = otpManager.create(req.params.token);
    const { email } = req.body;
    console.log('this is email in forgot pass ' + email);
    if (!(email)) {
        res.redirect('/signin');
    } else {
        User.findOne({
            where: {
                email: email
            }
        }).then(data => {
            otpSender.send(otp, data.phoneNo);
            res.render('passOtp', {
                isValid: false,
                areValid: true,
                nonValid: false,
                phoneNo: data.phoneNo
            })
        }).catch(err => {
            res.render('signin');
        })
    }
}

function resetPass(req, res) {
    const { codeBox1, codeBox2, codeBox3, codeBox4 } = req.body;
    const num = codeBox1 + codeBox2 + codeBox3 + codeBox4;
    const { phoneNo } = req.body;
    const verificationResults = otpManager.VerificationResults;
    const verificationResult = otpManager.verify(':123456', num);
    let statusCode;
    let bodyMessage;

    switch (verificationResult) {
        case verificationResults.valid:
            statusCode = 200;
            // bodyMessage = "OK";
            res.render('reset_password', {
                isValid: false,
                areValid: false,
                phoneNo: phoneNo
            });
            break;
        case verificationResults.notValid:
            statusCode = 404;
            // bodyMessage = "Not found"
            res.render('passOtp', {
                isValid: true,
                areValid: false,
                nonValid: false,
                phoneNo: phoneNo
            });
            break;
        case verificationResults.checked:
            statusCode = 409;
            // bodyMessage = "The code has already been verified";
            res.render('reset_password', {
                isValid: false,
                areValid: false,
                phoneNo: phoneNo
            });
            break;
        case verificationResults.expired:
            statusCode = 410;
            // bodyMessage = "The code is expired";
            res.render('passOtp', {
                isValid: false,
                areValid: false,
                nonValid: true,
                phoneNo: phoneNo
            });
            break;
        default:
            statusCode = 404;
            bodyMessage = "The code is invalid for unknown reason";
    }
    res.status(statusCode).send(bodyMessage);
};

function changePass(req, res) {
    const { pass1, pass2, phoneNo } = req.body;
    if (pass1 != pass2) {
        return res.render('reset_password', {
            isValid: false,
            areValid: true,
            phoneNo: phoneNo
        })
    }
    console.log(phoneNo + ' and ' + pass1)
    let sql = "UPDATE users SET password = ? WHERE phoneNo = ?";
    let data = [pass1, phoneNo];
    db.run(sql, data, (err) => {
        if (err) {
            console.log(err)
        }
        return res.render("reset_password", {
            isValid: true,
            areValid: false,
            phoneNo: phoneNo
        });
    })
}


module.exports = {
    signup: signup,
    signin: signin,
    signOut: signOut,
    signin_otp: signin_otp,
    otps: otps,
    forgotPass: forgotPass,
    resetPass: resetPass,
    changePass: changePass
};