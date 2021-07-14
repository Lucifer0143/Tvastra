const Sequelize = require("sequelize");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tvastra', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected throw schema........');
    }
});

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/backend/databases/database.sqlite"
});

const user = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    phoneNo: {
        type: Number,
        unique: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});

const User = new mongoose.model('User', user);

const doctor = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    phoneNo: {
        type: Number,
        unique: true
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    }
});

const Doctor = new mongoose.model('Doctor', doctor);

const doctorInfo = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    describe_yourself: {
        type: String
    },
    profile_picture: {
        contentType: String,
        image: Buffer
    },
    hospital: {
        type: String
    },
    experience: {
        type: Number
    },
    qualification: {
        type: String
    },
    award: {
        type: String
    },
    specialization: {
        type: String
    },
    achievement: {
        type: String
    },
    avg_fees: {
        type: String
    },
    timezone: {
        type: String
    },
    house: {
        type: String
    },
    colony: {
        type: String
    },
    treatment: {
        type: String
    }
});

const DoctorInfo = new mongoose.model('DoctorInfo', doctorInfo);


const schedule = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    weekday: {
        type: String
    },
    hospital: {
        type: String
    },
    fromtime: {
        type: String
    },
    totime: {
        type: String
    },
    interval: {
        type: Number
    },
    done: {
        type: String
    }
});

const Schedule = new mongoose.model('Schedule', schedule);


const scheduleSlot = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    schedule_id: {
        type: String
    },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    done: {
        type: String
    }
});

const ScheduleSlot = new mongoose.model('ScheduleSlot', scheduleSlot);


const medicalReport = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    typeOfReport: {
        type: String
    }
});

const MedicalReport = new mongoose.model('MedicalReport', medicalReport);

const reportImage = new mongoose.Schema({
    report_id: {
        type: String
    },
    report_image: {
        contentType: String,
        image: Buffer
    }
});

const ReportImage = new mongoose.model('ReportImage', reportImage);

// const users = sequelize.define("users", {
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     gender: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     dob: {
//         type: Sequelize.DATEONLY,
//         allowNull: false
//     },
//     phoneNo: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         unique: true
//     },
//     city: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     state: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     country: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// sequelize.sync()
//     .then(() => console.log("User created successfully"))
//     .catch(() => console.log("Error occurred when creating user"));


// const doctors = sequelize.define("doctors", {
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     gender: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     dob: {
//         type: Sequelize.DATEONLY,
//         allowNull: false
//     },
//     phoneNo: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         unique: true
//     },
//     city: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     state: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     country: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });

// sequelize.sync()
//     .then(() => console.log("Doctor created successfully"))
//     .catch(() => console.log("Error occurred when creating doctor"));


// const doctorInfo = sequelize.define("doctorInfo", {
//     doctor_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false,
//         unique: true
//     },
//     describe_yourself: {
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     profile_picture: {
//         type: Sequelize.BLOB,
//         allowNull: true
//     },
//     hospital: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     experience: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     qualification: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     award: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     specialization: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     achievement: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     avg_fees: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     timezone: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     house: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     colony: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     treatment: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });

// sequelize.sync()
//     .then(() => console.log("DoctorInfo created successfully"))
//     .catch(() => console.log("Error occurred when creating doctorInfo"));

// const schedule = sequelize.define("schedule", {
//     doctor_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     weekday: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     hospital: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     fromtime: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     totime: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     interval: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     done: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });

// sequelize.sync()
//     .then(() => console.log("Schedule created successfully"))
//     .catch(() => console.log("Error occurred when creating schedule"));


// const scheduleSlot = sequelize.define("scheduleSlot", {
//     doctor_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     schedule_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     start_time: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     end_time: {
//         type: Sequelize.STRING,
//         allowNull: true
//     },
//     done: {
//         type: Sequelize.STRING,
//         allowNull: true
//     }
// });

// sequelize.sync()
//     .then(() => console.log("ScheduleSlot created successfully"))
//     .catch(() => console.log("Error occurred when creating scheduleSlot"));

// const medicalReport = sequelize.define("medicalReport", {
//     doctor_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     date: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     typeOfReport: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// });

// sequelize.sync()
//     .then(() => console.log("Report created successfully"))
//     .catch(() => console.log("Error occurred when creating report"));


// sequelize.sync()
//     .then(() => console.log("Schedule created successfully"))
//     .catch(() => console.log("Error occurred when creating schedule"));


// const reportImage = sequelize.define("reportImage", {
//     report_id: {
//         type: Sequelize.NUMBER,
//         allowNull: false
//     },
//     report_image: {
//         type: Sequelize.BLOB,
//         allowNull: true
//     }
// });

// sequelize.sync()
//     .then(() => console.log("ReportImage created successfully"))
//     .catch(() => console.log("Error occurred when creating reportImage"));

module.exports = {
    User: User,
    Doctor: Doctor,
    DoctorInfo: DoctorInfo,
    Schedule: Schedule,
    MedicalReport: MedicalReport,
    ReportImage: ReportImage,
    ScheduleSlot: ScheduleSlot,
};