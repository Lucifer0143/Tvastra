const express = require("express");
const routes = require("./backend/routes/htmlRoutes");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compressions = require("compression");
const morgan = require("morgan");
const app = express();
const path = require("path");
// const OtpManager = require("./OtpManager");
// const otpRepository = require("./otpRepository");
// const otpSender = require("./otpSender")


app.use(cors());
app.use(compressions());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));



app.use(session({
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        sameSite: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 60
    }
}));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

app.set("views", __dirname + "/client/views");

app.set("css", __dirname + "/client/assets/css");

app.use("/", routes);

// const otpManager = new OtpManager(otpRepository, { otpLength: 5, validityTime: 5 });
// let url;
// app.post("/otp/:token", (req, res) => {
//     const otp = otpManager.create(req.params.token);
//     otpSender.send(otp, req.body);
//     url = '/otp/:123456/' + otp.code;
//     res.render('otps', {
//         urlCode: url,
//         isValid: false
//     });
// });

// app.post("/otpcode", (req, res) => {
//     const num = req.body.num;
//     const verificationResults = otpManager.VerificationResults;
//     const verificationResult = otpManager.verify(':123456', num);
//     let statusCode;
//     let bodyMessage;

//     switch (verificationResult) {
//         case verificationResults.valid:
//             statusCode = 200;
//             // bodyMessage = "OK";
//             return res.render('profile', {
//                 isValid: true,
//                 userName: 'mukesh',
//                 userPhoneNo: '2234353424'
//             })
//             break;
//         case verificationResults.notValid:
//             statusCode = 404;
//             bodyMessage = "Not found"
//             break;
//         case verificationResults.checked:
//             statusCode = 409;
//             bodyMessage = "The code has already been verified";
//             break;
//         case verificationResults.expired:
//             statusCode = 410;
//             bodyMessage = "The code is expired";
//             break;
//         default:
//             statusCode = 404;
//             bodyMessage = "The code is invalid for unknown reason";
//     }
//     res.status(statusCode).send(bodyMessage);
// });

app.post("/webhooks/message-status", (req, res) => {
    // console.log(req.body);
    res.status(200).end();
});

app.post("/webhooks/inbound-message", (req, res) => {
    res.send("inbound-message called");
});

app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
    console.log("Application running on port number : " + app.get("port"));
});

module.exports = app;