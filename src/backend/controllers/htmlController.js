const dbconn = require("../databases/sqlite.js");
const session = require("express-session");
const Lists = dbconn.Lists;
const User = dbconn.User;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "../databases/database.sqlite"));

// let profile = (req, res) => {
//     let userId = req.session.userId;
//     let sql = "SELECT item, id, done FROM lists WHERE user_id = ?";
//     let arr = [];
//     let arr1 = [];
//     let arr2 = [];
//     db.all(sql, [userId], (err, row) => {
//         if (err) {
//             throw err
//         }
//         row.forEach((row) => {
//             arr.push(row.item);
//             arr1.push(row.id);
//             arr2.push(row.done);
//         });
//         console.log(arr);
//         return res.render("profile", {
//             todo: arr,
//             todoId: arr1,
//             todoColor: arr2
//         })
//     });
// };
let profile = (req, res) => {
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
            isValid: false,
            userName: usersName,
            userPhoneNo: usersNo
        })
    });
}
let signin = (req, res) => {
    res.render("signin", {
        isValid: true
    });
};

let signup = (req, res) => {
    res.render("signup", {
        isValid: false,
        areValid: false
    });
};

let signin_otp = (req, res) => {
    res.render("signin_otp", {
        isValid: true
    });
};

let reset_password = (req, res) => {
    res.render("reset_password", {
        isValid: true
    });
};

let otp = (req, res) => {
    res.render("otp", {
        isValid: true
    });
};

let tvastra_plus = (req, res) => {
    res.render('tvastra_plus');
}
module.exports = {
    profile: profile,
    signin: signin,
    signup: signup,
    signin_otp: signin_otp,
    reset_password: reset_password,
    otp: otp,
    tvastra_plus: tvastra_plus
};