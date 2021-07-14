const dbconn = require("../databases/mongo.js");
// const express = require('express');
const moment = require('moment');
const fs = require('fs');
const Doctor = dbconn.Doctor;
const User = dbconn.User;
const DoctorInfo = dbconn.DoctorInfo;
const Schedule = dbconn.Schedule;
const ScheduleSlot = dbconn.ScheduleSlot;
const MedicalReport = dbconn.MedicalReport;
const ReportImage = dbconn.ReportImage;
const OtpManager = require('./OtpManager');
const otpRepository = require("./otpRepository");
const otpSender = require("./otpSender");
const otpManager = new OtpManager(otpRepository, { otpLength: 4, validityTime: 5 });
let url;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tvastra', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected throw loginController.......');
    }
});


function signup(req, res) {
    const { name, email, password, gender, dob, phoneNo, city, state, country, isdoctor } = req.body;
    console.log(isdoctor);
    if (!(name && email && password && gender && dob && phoneNo && city && state && country)) {
        return res.render("signup", {
            areValid: true,
            isValid: false
        });
    } else {
        if (isdoctor === 'on') {
            const createDocument = async() => {
                try {
                    const insertUser = new Doctor({
                        name: name,
                        email: email,
                        password: password,
                        gender: gender,
                        dob: dob,
                        phoneNo: phoneNo,
                        city: city,
                        state: state,
                        country: country
                    });
                    const result = await insertUser.save();
                    console.log(result);
                    req.session.userId = result._id;
                    res.cookie(req.session.userId);
                    return res.render('complete_profile', {
                        userName: name,
                        userPhoneNo: phoneNo,
                        doctor_id: result._id
                    });
                } catch (err) {
                    console.log(err);
                    return res.render("signup", {
                        isValid: true,
                        areValid: false
                    })
                }
            }
            createDocument();
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
    }
};

function signin(req, res) {
    const { email, password, isdoctor } = req.body;
    if (!(email && password)) {
        console.log('this is signin')
        return res.redirect("/signin");
    } else {
        // if (isdoctor === 'on') {
        const getdocumets = async() => {
            const data = await Doctor.findOne({ email: email }, (eror, value) => {
                if (eror) {
                    throw eror
                }
                console.log(value);
            });
            console.log(data);
            if (data == null) {
                const getuser = async() => {
                    const user = await User.findOne({ email: email }, (err, row) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(row);
                    });
                    console.log(user);
                    if (user == null) {
                        return res.render('signin', {
                            isValid: false
                        });
                    } else {
                        return res.render('profile', {
                            isValid: true,
                            userName: user.name,
                            userPhoneNo: user.phoneNo,
                            profilePic: "image"
                        });
                    }
                }
                getuser();
            } else {
                req.session.userId = data._id;
                res.cookie(req.session.userId);
                const getdocumet = async() => {
                    const result = await DoctorInfo.findOne({ doctor_id: data._id }, 'profile_picture', (err, rows) => {
                        if (err) {
                            throw err
                        }
                        console.log(rows);
                    });
                    if (result == null) {
                        return res.render('complete_profile', {
                            isValid: true,
                            userName: data.name,
                            userPhoneNo: data.phoneNo,
                            doctor_id: data._id
                        });
                    } else {
                        if (data.password == password) {
                            req.flash('info', 'msg');
                            res.redirect('/');
                        } else {
                            return res.render('signin', {
                                isValid: false,
                                userName: data.name,
                                userPhoneNo: data.phoneNo,
                                doctor_id: data._id
                            });
                        }
                    }
                }
                getdocumet();
            }
        }
        getdocumets();
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
            res.render('signin', {
                isValid: false
            });
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
};

function complete_profile(req, res) {
    const { describe_yourself, hospital, experience, qualification, award, specialization, avg_fees } = req.body;
    const doctor_id = req.session.userId;
    var finalImg;
    var arr1 = hospital.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
    var hospitals = arr1.toString();
    var arr2 = qualification.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
    var qualifications = arr2.toString();
    var arr3 = award.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
    var awards = arr3.toString();
    var arr4 = specialization.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
    var specializations = arr4.toString();

    if (req.file) {
        console.log('this is file path');
        console.log(req.file.path);
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer.from(encode_image, 'base64')
        };
    } else {
        var img = fs.readFileSync('src/client/assets/images/uploads/profile_picture-1619349578520.jpg');
        var encode_image = img.toString('base64');
        finalImg = {
            contentType: 'jpg',
            image: new Buffer.from(encode_image, 'base64')
        };
    }
    const createDocument = async() => {
        try {
            const insertUser = new DoctorInfo({
                doctor_id: doctor_id,
                describe_yourself: describe_yourself,
                profile_picture: finalImg,
                hospital: hospitals,
                experience: experience,
                qualification: qualifications,
                award: awards,
                specialization: specializations,
                avg_fees: avg_fees,
                achievement: '',
                timezone: '',
                colony: '',
                house: '',
                treatment: ''
            });
            const result = await insertUser.save();
            console.log(result);
            return res.redirect('/');
        } catch (err) {
            console.log(err);
            return res.redirect('/complete_profile');
        }
    }
    createDocument();
};

function dashboard(req, res) {
    const doctor_id = req.session.userId;
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: doctor_id }, (eror, value) => {
            if (eror) {
                throw eror
            }
            console.log(value)
        });
        const getdocumet = async() => {
            const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (erors, values) => {
                if (erors) {
                    throw erors
                }
                console.log(values)
            });
            res.render('dashboard', {
                userName: data.name,
                userPhoneNo: data.phoneNo,
                profilePic: info.profile_picture.image,
                picType: info.profile_picture.contentType,
            });
        }
        getdocumet();
    }
    getdocumets();
};

function editProfile(req, res) {
    res.redirect('/editProfile');
};

function editSchedule(req, res) {
    const { userPhoneNo } = req.body;
    const doctor_id = req.session.userId;
    res.redirect('/editSchedule');
};

function medicalReport(req, res) {
    res.redirect('/medicalReport');
};

function setting(req, res) {
    res.redirect('/setting');
};

function changeProfile(req, res) {
    const { name, email, phoneNo, gender, dob, houseName, colony, city, state, country, timezone, achievement, experience, qualification, specialization, award, hospital, treatments, fees, description } = req.body;
    const doctor_id = req.session.userId;
    if (hospital != '') {
        var arr1 = hospital.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var hospitals = arr1.toString();
    }
    if (qualification != '') {
        var arr2 = qualification.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var qualifications = arr2.toString();
    }
    if (award != '') {
        var arr3 = award.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var awards = arr3.toString();
    }
    if (specialization != '') {
        var arr4 = specialization.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var specializations = arr4.toString();
    }
    if (treatments != '') {
        var arr5 = treatments.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var treatment = arr5.toString();
    }
    if (achievement != '') {
        var arr6 = achievement.match(/\:".*?\"/g).map(x => x.replace(/[:""]/g, ""));
        var achievements = arr6.toString();
    }
    if (req.file) {
        var img = fs.readFileSync(req.file.path);
        encode_image = img.toString('base64');
        var finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer.from(encode_image, 'base64')
        };
        const updateImage = async() => {
            try {
                const updateImg = await DoctorInfo.findOneAndUpdate({ doctor_id: doctor_id }, {
                    profile_picture: finalImg
                }, { useFindAndModify: false });
                console.log(updateImg);
            } catch (err) {
                console.log(err);
            }
        }
        updateImage();
    }

    const createDocuments = async() => {
        try {
            const updateInfo = await DoctorInfo.findOneAndUpdate({ doctor_id: doctor_id }, {
                describe_yourself: description,
                hospital: hospitals,
                experience: experience,
                award: awards,
                qualification: qualifications,
                specialization: specializations,
                achievement: achievements,
                avg_fees: fees,
                timezone: timezone,
                colony: colony,
                house: houseName,
                treatment: treatment
            }, { useFindAndModify: false });
            console.log(updateInfo);
            const createDocument = async() => {
                try {
                    const updateData = await Doctor.findOneAndUpdate({ _id: doctor_id }, {
                        name: name,
                        email: email,
                        phoneNo: phoneNo,
                        gender: gender,
                        dob: dob,
                        city: city,
                        state: state,
                        country: country
                    }, { useFindAndModify: false });
                    console.log(updateData);
                    res.redirect('/editProfile');
                } catch (err) {
                    console.log(err);
                }
            }
            createDocument();
        } catch (err) {
            console.log(err);
        }
    }
    createDocuments();
};

function addMinutes(time, minsToAdd) {
    function D(J) { return (J < 10 ? '0' : '') + J; };
    var piece = time.split(':');
    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

    return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60);
}

function createSchedule(req, res) {
    const { weekday, hospital, fromtime, totime, interval } = req.body;
    let doctor_id = req.session.userId;
    console.log('this is moment');
    console.log(moment(fromtime, 'HH:mm a').add(interval, 'minutes').format('HH:mm a'));
    const createDocument = async() => {
        try {
            let sDone = 'unChecked';
            const insertSchedule = new Schedule({
                doctor_id,
                weekday,
                hospital,
                fromtime,
                totime,
                interval,
                done: sDone
            });
            const result = await insertSchedule.save();
            var schedule_id = result._id;
            // var time1 = fromtime.split(' ');
            // var time11 = time1[0].split(':');
            // if (time1[1] == 'pm' && parseInt(time11[0]) > 12) {
            //     time11[0] = parseInt(time11[0]);
            //     time11[0] = time11[0] + 12;
            // }
            // var min1 = time11[0] * 60 + +time11[1];
            // var time2 = totime.split(' ');
            // var time21 = time2[0].split(':');
            // if (time2[1] == 'pm' && parseInt(time21[0]) > 12) {
            //     time21[0] = parseInt(time21[0]);
            //     time21[0] = time21[0] + 12;
            // }
            // var min2 = time21[0] * 60 + +time21[1];
            // var start_time0 = time1[0],
            //     end_time0, done;
            // while ((min1 + +interval) <= min2) {
            //     end_time0 = addMinutes(start_time0, interval);
            //     var start_time = start_time0 + 'AM';
            //     var end_time = end_time0 + 'AM';
            //     var temp1 = parseInt(start_time0.split(':')[0]);
            //     var temp2 = parseInt(end_time0.split(':')[0]);
            //     if (temp1 > 12) {
            //         start_time = temp1 - 12 + 'PM';
            //     }
            //     if (temp1 == 12) {
            //         end_time = temp1 + 'PM';
            //     }
            //     if (temp2 > 12) {
            //         end_time = temp2 - 12 + 'PM';
            //     }
            //     if (temp2 == 12) {
            //         end_time = temp2 + 'PM'; 
            //     }
            var start_time = fromtime;
            while (moment(start_time, 'HH:mm A') < moment(totime, 'HH:mm A')) {
                var end_time = moment(start_time, 'HH:mm A').add(interval, 'minutes').format('LT');
                const createDocuments = async() => {
                        try {
                            let Done = 'unChecked';
                            const insertSlot = new ScheduleSlot({
                                doctor_id,
                                schedule_id,
                                start_time,
                                end_time,
                                done: Done
                            });
                            const results = await insertSlot.save();
                            console.log(results);
                        } catch (err) {
                            console.log(err);
                        }
                    }
                    // start_time0 = end_time0;
                    // min1 = min1 + +interval;
                createDocuments();
                start_time = moment(start_time, 'HH:mm A').add(interval, 'minutes').format('LT');
            }
            res.redirect('/editSchedule');
        } catch (err) {
            console.log(err);
            return res.redirect('/editSchedule');
        }
    }
    createDocument();
};


function viewSlots(req, res) {
    let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [],
        arr5 = [],
        arr6 = [],
        arr7 = [];
    const doctor_id = req.session.userId;
    let sql = 'SELECT id, weekday, hospital, fromtime, totime, interval, done FROM schedules WHERE doctor_id = ?';
    db.all(sql, [doctor_id], (err, row) => {
        if (err) {
            throw err
        }
        row.forEach((row) => {
            arr1.push(row.id);
            arr2.push(row.weekday);
            arr3.push(row.hospital);
            arr4.push(row.fromtime);
            arr5.push(row.totime);
            arr6.push(row.interval);
            arr7.push(row.done);
        });
        let arr11 = [],
            arr12 = [],
            arr13 = [];
        const getdocumets = async() => {
            const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
                if (err) {
                    throw err
                }
                console.log(data);
            });
            const getdocumet = async() => {
                const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (errs, rows) => {
                    if (errs) {
                        throw errs
                    }
                    console.log(info);
                });
                const { scheduleId } = req.body;
                let sqls = 'SELECT start_time, end_time, done FROM scheduleSlots WHERE schedule_id = ?';
                db.all(sqls, [scheduleId], (er, rows) => {
                    if (er) {
                        throw er
                    }
                    let arr8 = [],
                        arr9 = [],
                        arr10 = [];
                    rows.forEach((rows) => {
                        arr8.push(rows.start_time);
                        arr9.push(rows.end_time);
                        arr10.push(rows.done);
                    });
                    res.render('editSchedule', {
                        userName: data.name,
                        userPhoneNo: data.phoneNo,
                        profilePic: info.profile_picture.image,
                        picType: info.profile_picture.contentType,
                        scheduleId: arr1,
                        weekDay: arr2,
                        hospitalName: arr3,
                        fromTime: arr4,
                        toTime: arr5,
                        interval: arr6,
                        Done: arr7,
                        startTime: arr8,
                        endTime: arr9,
                        slotDone: arr10
                    });
                });
            }
            getdocumet();
        }
        getdocumets();
    });
}

function rmvSlot(req, res) {
    const { scheduleId } = req.body;
    console.log('this is report id ' + scheduleId);
    const deleteDocument = async() => {
        try {
            const deleteSchedule = await Schedule.findOneAndRemove({ _id: scheduleId });
            console.log(deleteSchedule);
            const deleteDocuments = async() => {
                try {
                    const deleteSlots = await ScheduleSlot.deleteMany({ schedule_id: scheduleId });
                    console.log(deleteSlots);
                    res.redirect('/editSchedule');
                } catch (err) {
                    console.log(err);
                };
            };
            deleteDocuments();
        } catch (err) {
            console.log(err);
        };
    };
    deleteDocument();
};

function scheduleDone(req, res) {
    const { scheduleId, scheduleDone } = req.body;
    let Done = 'unChecked';
    if (scheduleDone == 'on') {
        Done = 'checked';
    }
    const updateDocument = async() => {
        try {
            const updateDoc = await Schedule.findOneAndUpdate({ _id: scheduleId }, {
                done: Done
            }, { useFindAndModify: false });
            console.log(updateDoc);
            res.redirect('/editSchedule');
        } catch (err) {
            console.log(err);
        }
    }
    updateDocument();
};

function scheduleSlotDone(req, res) {
    const { scheduleSlotId, scheduleSlotDone } = req.body;
    let Done = 'unChecked';
    console.log('this is schedule done ' + scheduleSlotDone + scheduleSlotId);
    if (scheduleSlotDone == 'on') {
        Done = 'checked';
    };
    const updateDocument = async() => {
        try {
            const updateDoc = await ScheduleSlot.findOneAndUpdate({ _id: scheduleSlotId }, {
                done: Done
            }, { useFindAndModify: false });
            console.log(updateDoc);
            res.redirect('/editSchedule');
        } catch (err) {
            console.log(err);
        }
    }
    updateDocument();
};

function addRecords(req, res) {
    const { title, name, date, typeOfReport } = req.body;
    let doctor_id = req.session.userId;
    var arr = [];
    console.log(req.files[0].path);
    for (var i = 0; i < req.files.length; i++) {
        var img, encode_image;
        img = fs.readFileSync(req.files[i].path);
        encode_image = img.toString('base64');
        var finalImg = {
            contentType: req.files[i].mimetype,
            image: new Buffer.from(encode_image, 'base64')
        };
        arr.push(finalImg);
    };
    const createDocument = async() => {
        try {
            const insertReport = new MedicalReport({
                doctor_id,
                title,
                name,
                date,
                typeOfReport
            });
            const result = await insertReport.save();
            console.log(result);
            var report_id = result._id;
            for (var j = 0; j < arr.length; j++) {
                var report_image = arr[j];
                const createDocuments = async() => {
                    try {
                        const insertImg = new ReportImage({
                            report_id,
                            report_image
                        });
                        const results = await insertImg.save();
                        console.log(results);
                    } catch (err) {
                        console.log(err);
                    }
                };
                createDocuments();
            }
            res.redirect('/medicalReport');
        } catch (err) {
            console.log(err);
        }
    };
    createDocument();
};

function newRecord(req, res) {
    const { reportId } = req.body;
    let doctor_id = req.session.userId;
    var arr = [];
    for (var i = 0; i < req.files.length; i++) {
        var img, encode_image;
        img = fs.readFileSync(req.files[i].path);
        encode_image = img.toString('base64');
        var finalImg = {
            contentType: req.files[i].mimetype,
            image: new Buffer.from(encode_image, 'base64')
        };
        arr.push(finalImg);
    };
    var report_id = reportId;
    for (var j = 0; j < arr.length; j++) {
        var report_image = arr[j];
        const createDocuments = async() => {
            try {
                const insertImg = new ReportImage({
                    report_id,
                    report_image
                });
                const results = await insertImg.save();
                console.log(results);
            } catch (err) {
                console.log(err);
            }
        };
        createDocuments();
    }
    let arr1 = [],
        arr3 = [],
        arr2 = [];
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
            if (err) {
                throw err
            }
            console.log(row);
        });
        const getdocumet = async() => {
            const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (errs, rows) => {
                if (errs) {
                    throw errs
                }
                console.log(rows);
            });
            const getImages = async() => {
                const result = await ReportImage.find({ report_id }, (eror, rows) => {
                    if (eror) {
                        throw eror
                    }
                    console.log(rows);
                });
                result.forEach((result) => {
                    arr1.push(result.report_image.image);
                    arr2.push(result.report_image.contentType);
                });
                const getReport = async() => {
                    const results = await MedicalReport.findOne({ _id: reportId }, (erors, rows) => {
                        if (erors) {
                            throw erors
                        }
                        console.log(rows);
                    });
                    res.render('record', {
                        userName: data.name,
                        userPhoneNo: data.phoneNo,
                        profilePic: info.profile_picture.image,
                        picType: info.profile_picture.contentType,
                        title: results.title,
                        typeOfReport: results.typeOfReport,
                        reportImage: arr1,
                        imageType: arr2,
                        imageId: arr3,
                        reportId: report_id
                    });
                }
                getReport();
            }
            getImages();
        }
        getdocumet();
    }
    getdocumets();
};

function rmvRecord(req, res) {
    const { report_id } = req.body;
    const deleteDocument = async() => {
        try {
            const deleteSchedule = await MedicalReport.findOneAndRemove({ _id: report_id });
            console.log(deleteSchedule);
            const deleteDocuments = async() => {
                try {
                    const deleteSlots = await ReportImage.deleteMany({ report_id: report_id });
                    console.log(deleteSlots);
                    res.redirect('/medicalReport');
                } catch (err) {
                    console.log(err);
                };
            };
            deleteDocuments();
        } catch (err) {
            console.log(err);
        };
    };
    deleteDocument();
};

function record(req, res) {
    const { report_id } = req.body;
    const doctor_id = req.session.userId;
    let arr1 = [],
        arr2 = [],
        arr3 = [];
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
            if (err) {
                throw err
            }
            console.log(row);
        });
        const getdocumet = async() => {
            const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (errs, rows) => {
                if (errs) {
                    throw errs
                }
                console.log(rows);
            });
            const getImages = async() => {
                const result = await ReportImage.find({ report_id }, (eror, rows) => {
                    if (eror) {
                        throw eror
                    }
                    console.log(rows);
                });
                result.forEach((result) => {
                    arr1.push(result.report_image.image);
                    arr2.push(result.report_image.contentType);
                    arr3.push(result._id);
                });
                const getReport = async() => {
                    const results = await MedicalReport.findOne({ _id: report_id }, (erors, rows) => {
                        if (erors) {
                            throw erors
                        }
                        console.log(rows);
                    });
                    res.render('record', {
                        userName: data.name,
                        userPhoneNo: data.phoneNo,
                        profilePic: info.profile_picture.image,
                        picType: info.profile_picture.contentType,
                        title: results.title,
                        typeOfReport: results.typeOfReport,
                        reportImage: arr1,
                        imageType: arr2,
                        imageId: arr3,
                        reportId: report_id
                    });
                }
                getReport();
            }
            getImages();
        }
        getdocumet();
    }
    getdocumets();
};

function deleteReportImg(req, res) {
    const { image_id, report_id } = req.body;
    const doctor_id = req.session.userId;
    const deleteDocument = async() => {
        try {
            const deleteImg = await ReportImage.findOneAndRemove({ _id: image_id });
            console.log(deleteImg);
        } catch (err) {
            console.log(err);
        }
    }
    deleteDocument();
    let arr1 = [],
        arr2 = [],
        arr3 = [];
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
            if (err) {
                throw err
            }
            console.log(row);
        });
        const getdocumet = async() => {
            const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (errs, rows) => {
                if (errs) {
                    throw errs
                }
                console.log(rows);
            });
            const getImages = async() => {
                const result = await ReportImage.find({ report_id }, (eror, rows) => {
                    if (eror) {
                        throw eror
                    }
                    console.log(rows);
                });
                result.forEach((result) => {
                    arr1.push(result.report_image.image);
                    arr2.push(result.report_image.contentType);
                    arr3.push(result._id);
                });
                const getReport = async() => {
                    const results = await MedicalReport.findOne({ _id: report_id }, (erors, rows) => {
                        if (erors) {
                            throw erors
                        }
                        console.log(rows);
                    });
                    res.render('record', {
                        userName: data.name,
                        userPhoneNo: data.phoneNo,
                        profilePic: info.profile_picture.image,
                        picType: info.profile_picture.contentType,
                        title: results.title,
                        typeOfReport: results.typeOfReport,
                        reportImage: arr1,
                        imageType: arr2,
                        imageId: arr3,
                        reportId: report_id
                    });
                }
                getReport();
            }
            getImages();
        }
        getdocumet();
    }
    getdocumets();
};

function settingPassword(req, res) {
    const doctor_id = req.session.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
            if (err) {
                throw err
            }
            console.log(row);
        });
        if (data.password === currentPassword) {
            if (newPassword === confirmPassword) {
                const updatePassword = async() => {
                    try {
                        const updatePass = await Doctor.findOneAndUpdate({ _id: doctor_id }, {
                            password: newPassword
                        }, { useFindAndModify: false });
                        console.log(updatePass);
                        res.redirect('/setting');
                    } catch (err) {
                        console.log(err);
                    }
                }
                updatePassword();
            }
        }
    }
    getdocumets();
};

function doctorInfo(req, res) {
    const { doctorInfoId, doctorName, doctorCountry } = req.body;
    const getdocumets = async() => {
        const info = await DoctorInfo.findOne({ _id: doctorInfoId }, (err, row) => {
            if (err) {
                throw err
            }
            console.log(row);
        });
        res.render('doctors_profile', {
            Name: doctorName,
            country: doctorCountry,
            specialization: info.specialization,
            qualification: info.qualification,
            award: info.award,
            treatments: info.treatments,
            experience: info.experience,
            profilePic: info.profile_picture.image,
            picType: info.profile_picture.contentType,
            avgFees: info.avg_fees
        });
    }
    getdocumets();
};
module.exports = {
    signup: signup,
    signin: signin,
    signOut: signOut,
    signin_otp: signin_otp,
    otps: otps,
    forgotPass: forgotPass,
    resetPass: resetPass,
    changePass: changePass,
    complete_profile: complete_profile,
    dashboard: dashboard,
    editProfile: editProfile,
    editSchedule: editSchedule,
    medicalReport: medicalReport,
    setting: setting,
    changeProfile: changeProfile,
    createSchedule: createSchedule,
    rmvSlot: rmvSlot,
    scheduleDone: scheduleDone,
    scheduleSlotDone: scheduleSlotDone,
    addRecords: addRecords,
    viewSlots: viewSlots,
    rmvRecord: rmvRecord,
    record: record,
    newRecord: newRecord,
    deleteReportImg: deleteReportImg,
    settingPassword: settingPassword,
    doctorInfo: doctorInfo
};