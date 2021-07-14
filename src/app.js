const express = require("express");
const app = express();
const routes = require("./backend/routes/htmlRoutes");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compressions = require("compression");
const morgan = require("morgan");
const multer = require('multer');
const path = require("path");
const moment = require('moment');
const flash = require('connect-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(compressions());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client")));


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/client/assets/images/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage });


app.use(session({
    secret: "KonfinitySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        sameSite: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 60 * 60
    }
}));

app.use(flash());

app.engine("html", require("ejs").renderFile);

app.set("view engine", "ejs");

app.set("views", __dirname + "/client/views");

app.set("css", __dirname + "/client/assets/css");

app.use('/changeProfile', upload.single('profile_picture'), (req, res, next) => {
    next();
});

app.use('/complete_profile', upload.single('profile_picture'), (req, res, next) => {
    next();
});

app.use('/addRecords', upload.array('reportImage', 6), (req, res, next) => {
    next();
});

app.use('/newRecord', upload.array('reportImage', 6), (req, res, next) => {
    next();
});

app.use("/", routes);

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