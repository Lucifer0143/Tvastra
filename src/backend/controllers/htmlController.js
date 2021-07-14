const dbconn = require("../databases/mongo.js");
const moment = require('moment');
const Doctor = dbconn.Doctor;
const User = dbconn.User;
const DoctorInfo = dbconn.DoctorInfo;
const Schedule = dbconn.Schedule;
const ScheduleSlot = dbconn.ScheduleSlot;
const MedicalReport = dbconn.MedicalReport;
const ReportImage = dbconn.ReportImage;
const path = require("path");
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(path.resolve(__dirname, "../databases/database.sqlite"));
const mongoose = require('mongoose');
// const { MedicalReport, Schedule } = require("../databases/mongo.js");

mongoose.connect('mongodb://localhost:27017/tvastra', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected throw htmlController.......');
    }
});

let profile = (req, res) => {
    let userId = req.session.userId;
    const getdocumets = async() => {
        const data = await Doctor.findOne({ _id: userId }, (eror, row) => {
            if (eror) {
                throw eror
            }
            console.log(row);
        });
        const getdocumet = async() => {
            const info = await DoctorInfo.findOne({ doctor_id: userId }, (erors, rows) => {
                if (erors) {
                    throw erors
                }
                console.log(rows);
            });
            return res.render('profile', {
                message: req.flash('info'),
                isValid: true,
                userName: data.name,
                userPhoneNo: data.phoneNo,
                profilePic: info.profile_picture.image,
                picType: info.profile_picture.contentType
            });
        };
        getdocumet();
    };
    getdocumets();
};

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
    const doctor_id = req.session.userId;
    const { NameAssc, NameDisc, AvgFeeAssc, AvgFeeDisc, ExperienceAssc, ExperienceDisc } = req.query;
    let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [],
        arr51 = [],
        arr52 = [],
        arr6 = [],
        arr7 = [],
        arr8 = [],
        arr91 = [],
        arr92 = [],
        arr10 = [],
        arr11 = [],
        arr12 = [],
        arr13 = [],
        arr14 = [],
        arr15 = [],
        arr16 = [],
        arr17 = [],
        arr18 = [],
        arr19 = [],
        arr20 = [],
        arr21 = [],
        arr22 = [],
        Sarr1 = [],
        Sarr2 = [],
        Sarr3 = [],
        Sarr4 = [],
        Sarr6 = [],
        Sarr8 = [],
        SSarr1 = [],
        SSarr2 = [],
        SSarr3 = [],
        SSarr4 = [],
        SSarr6 = [],
        SSarr8 = [];
    const findDocument = async() => {
        var tempArr0 = [];
        try {
            const result = await Doctor.find();
            result.forEach((result) => {
                arr1.push(result._id);
                arr2.push(result.name);
                arr3.push(result.country);
                tempArr0.push(result.name);
            });
            if (NameAssc == "NameAssc") {
                var tempArr = [],
                    tempArr1 = [],
                    tempArr2 = [];
                tempArr = arr2.sort();
                for (var i1 = 0; i1 < arr2.length; i1++) {
                    for (var j1 = 0; j1 < arr2.length; j1++) {
                        if (tempArr[i1] == tempArr0[j1]) {
                            tempArr1.push(arr1[j1]);
                            tempArr2.push(arr3[j1]);
                        }
                    }
                }
                arr1 = tempArr1;
                arr2 = tempArr;
                arr3 = tempArr2;
            } else if (NameDisc == 'NameDisc') {
                var tempArr = [],
                    tempArr1 = [],
                    tempArr2 = [];
                tempArr = arr2.sort().reverse();
                console.log(tempArr);
                for (var i1 = 0; i1 < arr2.length; i1++) {
                    for (var j1 = 0; j1 < arr2.length; j1++) {
                        if (tempArr[i1] == tempArr0[j1]) {
                            tempArr1.push(arr1[j1]);
                            tempArr2.push(arr3[j1]);
                        }
                    }
                }
                arr1 = tempArr1;
                arr2 = tempArr;
                arr3 = tempArr2;
            }
            const findDocuments = async() => {
                try {
                    const results = await DoctorInfo.find();
                    console.log('this is results');
                    console.log(results);
                    results.forEach((results) => {
                        arr4.push(results.doctor_id);
                        arr51.push(results.profile_picture.image);
                        arr52.push(results.profile_picture.contentType);
                        arr6.push(results.qualification);
                        arr7.push(results.specialization);
                        arr8.push(results.hospital);
                        arr15.push(results.experience);
                        arr16.push(results.avg_fees);
                        arr17.push(results.award);
                        arr18.push(results.treatment);
                        arr21.push(results._id);
                    });
                    for (var i = 0; i < arr1.length; i++) {
                        var k = 0;
                        for (var j = 0; j < arr4.length; j++) {
                            if (arr1[i] == arr4[j]) {
                                arr91.push(arr51[j]);
                                arr92.push(arr52[j]);
                                arr10.push(arr6[j]);
                                arr11.push(arr7[j]);
                                arr12.push(arr8[j]);
                                arr13.push(arr15[j]);
                                arr14.push(arr16[j]);
                                arr19.push(arr17[j]);
                                arr20.push(arr18[j]);
                                arr22.push(arr21[j]);
                                k++;
                            }
                        }
                        if (k == 0) {
                            arr91.push(' ');
                            arr92.push(' ');
                            arr10.push(' ');
                            arr11.push(' ');
                            arr12.push(' ');
                            arr13.push(' ');
                            arr14.push(' ');
                            arr19.push(' ');
                            arr20.push(' ');
                            arr22.push(' ');
                        }
                    };
                    const getdocuments = async() => {
                        const data = await Doctor.findOne({ _id: doctor_id }, (err, row) => {
                            if (err) {
                                throw err
                            }
                            console.log(row)
                        })
                        const getdocument = async() => {
                            const info = await DoctorInfo.findOne({ doctor_id: doctor_id }, (errs, rows) => {
                                if (errs) {
                                    throw errs
                                }
                                console.log(rows);
                            });
                            var today_0 = moment().format('dddd MMMM, DD YYYY'),
                                today_1 = moment().add(1, 'days').format('dddd MMMM, DD YYYY'),
                                today_2 = moment().add(2, 'days').format('dddd MMMM, DD YYYY'),
                                today_3 = moment().add(3, 'days').format('dddd MMMM, DD YYYY'),
                                today_4 = moment().add(4, 'days').format('dddd MMMM, DD YYYY'),
                                today_5 = moment().add(5, 'days').format('dddd MMMM, DD YYYY'),
                                today_6 = moment().add(6, 'days').format('dddd MMMM, DD YYYY');
                            const findSchedules = async() => {
                                try {
                                    const allSchedule = await Schedule.find({ done: 'unChecked' });
                                    allSchedule.forEach((allSchedule) => {
                                        Sarr1.push(allSchedule._id);
                                        Sarr2.push(allSchedule.doctor_id);
                                        Sarr3.push(allSchedule.weekday);
                                        Sarr4.push(allSchedule.hospital);
                                    });
                                    for (var m = 0; m < arr1.length; m++) {
                                        var Sarr5 = [],
                                            Sarr7 = [];
                                        for (n = 0; n < Sarr2.length; n++) {
                                            if (arr1[m] == Sarr2[n]) {
                                                Sarr5.push(Sarr3[n]);
                                                Sarr7.push(Sarr1[n]);
                                            }
                                        }
                                        Sarr6.push(Sarr5);
                                        Sarr8.push(Sarr7);
                                    }
                                    console.log(Sarr6);
                                    console.log(Sarr8);
                                    const findSchedulesSlots = async() => {
                                        try {
                                            const allScheduleSlots = await ScheduleSlot.find({ done: 'unChecked' });
                                            allScheduleSlots.forEach((allScheduleSlots) => {
                                                SSarr1.push(allScheduleSlots._id);
                                                SSarr2.push(allScheduleSlots.doctor_id);
                                                SSarr3.push(allScheduleSlots.schedule_id);
                                                SSarr4.push(allScheduleSlots.start_time);
                                            });
                                            for (var p = 0; p < Sarr8.length; p++) {
                                                var SSarr5 = [];
                                                for (q = 0; q < Sarr8[p].length; q++) {
                                                    var SSarr7 = [];
                                                    for (var r = 0; r < SSarr3.length; r++) {
                                                        if (Sarr8[p][q] == SSarr3[r]) {
                                                            SSarr7.push(SSarr4[r]);
                                                        }
                                                    }
                                                    SSarr5.push(SSarr7);
                                                }
                                                SSarr6.push(SSarr5);
                                            }
                                            var msgs = 'this is slots';
                                            console.log(msgs.toLocaleUpperCase());
                                            console.log(SSarr6);
                                            for (var x = 0; x < Sarr6.length; x++) {
                                                var SSarr9 = [
                                                        [],
                                                        [],
                                                        [],
                                                        [],
                                                        [],
                                                        [],
                                                        []
                                                    ],
                                                    temp = 0;
                                                for (var y = 0; y < Sarr6[x].length; y++) {
                                                    if (Sarr6[x][y].toLocaleUpperCase() == moment().format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[0].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[0].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[0] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(1, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[1].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[1].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[1] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(2, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[2].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[2].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[2] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(3, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[3].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[3].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[3] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(4, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[4].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[4].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[4] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(5, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[5].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[5].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[5] = SSarr6[x][y];
                                                        }
                                                    } else if (Sarr6[x][y].toLocaleUpperCase() == moment().add(6, 'days').format('dddd').toLocaleUpperCase()) {
                                                        if (SSarr9[6].length > 0) {
                                                            for (var a = 0; a < SSarr6[x][y].length; a++) {
                                                                SSarr9[6].push(SSarr6[x][y][a]);
                                                            }
                                                        } else {
                                                            SSarr9[6] = SSarr6[x][y];
                                                        }
                                                    } else {
                                                        console.log('888888888888888888888');
                                                    }
                                                }
                                                SSarr8.push(SSarr9);
                                            }
                                            var msgs = 'this is sorted slots';
                                            console.log(msgs.toLocaleUpperCase());
                                            console.log(SSarr8);
                                            res.render('doctor', {
                                                userName: data.name,
                                                userPhoneNo: data.phoneNo,
                                                profilePic: info.profile_picture.image,
                                                picType: info.profile_picture.contentType,
                                                Name: arr2,
                                                Country: arr3,
                                                profilePics: arr91,
                                                picTypes: arr92,
                                                Qualification: arr10,
                                                Specialization: arr11,
                                                Hospital: arr12,
                                                Experience: arr13,
                                                AvgFees: arr14,
                                                Award: arr19,
                                                Treatment: arr20,
                                                doctorInfoId: arr22,
                                                today0: today_0,
                                                today1: today_1,
                                                today2: today_2,
                                                today3: today_3,
                                                today4: today_4,
                                                today5: today_5,
                                                today6: today_6,
                                                Slots: SSarr8
                                            });
                                        } catch (err) {
                                            console.log(err);
                                        }
                                    }
                                    findSchedulesSlots();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                            findSchedules();
                        }
                        getdocument();
                    }
                    getdocuments();
                } catch (eror) {
                    console.log(eror);
                }
            };
            findDocuments();
        } catch (erors) {
            console.log(erors);
        }
    };
    findDocument();
};

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

let complete_profile = (req, res) => {
    const doctor_id = req.session.userId;
    res.render('complete_profile');
};

let editProfile = (req, res) => {
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
            return res.render('editProfile', {
                userName: data.name,
                userPhoneNo: data.phoneNo,
                profilePic: info.profile_picture.image,
                picType: info.profile_picture.contentType,
                userEmail: data.email,
                userGender: data.gender,
                userDob: data.dob,
                userCity: data.city,
                userState: data.state,
                userCountry: data.country,
                userHospital: info.hospital,
                userExperience: info.experience,
                userQualification: info.qualification,
                userAward: info.award,
                userSpecialization: info.specialization,
                userAchievement: info.achievement,
                userFees: info.avg_fees,
                userTimezone: info.timezone,
                userHouse: info.house,
                userColony: info.colony,
                userTreatment: info.treatment,
                userDescription: info.describe_yourself,
            })
        };
        getdocumet();
    }
    getdocumets();
};

let dashboard = (req, res) => {
    res.render('dashboard', {
        userName: 'userName',
        userPhoneNo: 'userPhoneNo'
    });
};

let editSchedule = (req, res) => {
    const doctor_id = req.session.userId;
    let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [],
        arr5 = [],
        arr6 = [],
        arr7 = [],
        arr8 = [],
        arr9 = [],
        arr10 = [],
        arr11 = [],
        arr12 = [],
        arr13 = [],
        arr14 = [],
        arr18 = [],
        arr20 = [];
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
            var hsptl = info.hospital;
            hsptl = hsptl.split(',');
            const findDocument = async() => {
                try {
                    const result = await Schedule.find({ doctor_id });
                    console.log('this is result');
                    console.log(result);
                    result.forEach((result) => {
                        arr1.push(result._id);
                        arr2.push(result.weekday);
                        arr3.push(result.hospital);
                        arr4.push(result.fromtime);
                        arr5.push(result.totime);
                        arr6.push(result.interval);
                        arr7.push(result.done);
                    });
                    const findDocuments = async() => {
                        try {
                            const results = await ScheduleSlot.find({ doctor_id });
                            console.log('this is results');
                            console.log(results);
                            results.forEach((results) => {
                                arr18.push(results._id);
                                arr8.push(results.schedule_id);
                                arr9.push(results.start_time);
                                arr10.push(results.end_time);
                                arr11.push(results.done);
                            });
                            for (var i = 0; i < arr1.length; i++) {
                                let arr15 = [],
                                    arr16 = [],
                                    arr17 = [],
                                    arr19 = [];
                                for (j = 0; j < arr8.length; j++) {
                                    if (arr1[i] == arr8[j]) {
                                        arr19.push(arr18[j]);
                                        arr15.push(arr9[j]);
                                        arr16.push(arr10[j]);
                                        arr17.push(arr11[j]);
                                    }
                                };
                                arr20.push(arr19);
                                arr12.push(arr15);
                                arr13.push(arr16);
                                arr14.push(arr17);
                            };
                            res.render('editSchedule', {
                                userName: data.name,
                                userPhoneNo: data.phoneNo,
                                profilePic: info.profile_picture.image,
                                picType: info.profile_picture.contentType,
                                Hospital: hsptl,
                                scheduleId: arr1,
                                weekDay: arr2,
                                hospitalName: arr3,
                                fromTime: arr4,
                                toTime: arr5,
                                interval: arr6,
                                Done: arr7,
                                startTime: arr12,
                                endTime: arr13,
                                slotDone: arr14,
                                slotId: arr20
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    };
                    findDocuments();
                } catch (err) {
                    console.log(err);
                }
            };
            findDocument();
        }
        getdocumet();
    }
    getdocumets();
};

let scheduleDone = (req, res) => {
    res.redirect('/editSchedule');
}

let medicalReport = (req, res) => {
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
            let arr1 = [],
                arr2 = [],
                arr3 = [],
                arr4 = [],
                arr5 = [],
                arr6 = [];
            const getReport = async() => {
                try {
                    const result = await MedicalReport.find({ doctor_id });
                    console.log(result);
                    result.forEach((result) => {
                        arr1.push(result.id);
                        arr2.push(result.name);
                        arr3.push(result.title);
                        arr4.push(result.date);
                        arr5.push(result.typeOfReport);
                    });
                    res.render('medicalReport', {
                        userName: data.name,
                        userPhoneNo: data.phoneNo,
                        profilePic: info.profile_picture.image,
                        picType: info.profile_picture.contentType,
                        reportId: arr1,
                        Name: arr2,
                        Title: arr3,
                        Date: arr4,
                        typeOfReport: arr5,
                    });
                } catch (err) {
                    console.log(err);
                }
            };
            getReport();
        }
        getdocumet();
    }
    getdocumets();
};

let record = (req, res) => {
    const { reportId } = req.body;
    console.log(reportId);
    const doctor_id = req.session.userId;
    let arr = [];
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
            res.render('record', {
                userName: data.name,
                userPhoneNo: data.phoneNo,
                profilePic: info.profile_picture.image,
                picType: info.profile_picture.contentType,
                reportImage: arr
            });
        }
        getdocumet();
    }
    getdocumets();
}

let setting = (req, res) => {
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
            res.render('setting', {
                userName: data.name,
                userPhoneNo: data.phoneNo,
                profilePic: info.profile_picture.image,
                picType: info.profile_picture.contentType
            });
        }
        getdocumet();
    }
    getdocumets();
};

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
    tvastra_plus: tvastra_plus,
    complete_profile: complete_profile,
    editProfile: editProfile,
    dashboard: dashboard,
    editSchedule: editSchedule,
    scheduleDone: scheduleDone,
    medicalReport: medicalReport,
    record: record,
    setting: setting
};