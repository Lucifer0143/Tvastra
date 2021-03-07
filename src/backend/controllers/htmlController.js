const dbconn = require("../databases/sqlite.js");
const session = require("express-session");
const Lists = dbconn.Lists;
const User = dbconn.User;
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(path.resolve(__dirname, "../databases/database.sqlite"));

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
        isValid: false,
        areValid: false
    });
};

let reset_password = (req, res) => {
    res.render("reset_password", {
        isValid: true,
        areValid: false
    });
};

let otps = (req, res) => {
    res.render("otps", {
        isValid: false,
        areValid: true,
        nonValid: false
    });
};

let tvastra_plus = (req, res) => {
    res.render('tvastra_plus');
}

let dentistry = (req, res) => {
    res.render('dentistry');
}

let about_hospital = (req, res) => {
    res.render('about_hospital');
}

let aboutus = (req, res) => {
    res.render('aboutus');
}

let appointment = (req, res) => {
    res.render('appointment');
}

let contactus = (req, res) => {
    res.render('contactus');
}

let doctor = (req, res) => {
    res.render('doctor');
}

let doctors_profile = (req, res) => {
    res.render('doctors_profile');
}

let faq = (req, res) => {
    res.render('faq');
}

let hospital = (req, res) => {
    res.render('hospital');
}

let index = (req, res) => {
    res.render('index');
}

let passOtp = (req, res) => {
    res.render('passOtp');
}

module.exports = {
    profile: profile,
    signin: signin,
    signup: signup,
    dentistry: dentistry,
    about_hospital: about_hospital,
    aboutus: aboutus,
    appointment: appointment,
    contactus: contactus,
    doctor: doctor,
    doctors_profile: doctors_profile,
    faq: faq,
    hospital: hospital,
    index: index,
    signin_otp: signin_otp,
    reset_password: reset_password,
    otps: otps,
    passOtp: passOtp,
    tvastra_plus: tvastra_plus
};