const express = require("express");
const pages = require("../controllers/htmlController");
const loginController = require("../controllers/loginController");
const middle = require("../controllers/middleController");
const router = express.Router();

router.route("/").get(middle.redirectSignin, pages.profile);
router.route("/signin").get(middle.redirectProfile, pages.signin);
router.route("/signup").get(middle.redirectProfile, pages.signup);
router.route("/signin_otp").get(pages.signin_otp);
router.route("/reset_password").get(pages.reset_password);
// router.route("/otp").get(pages.otp);
router.route("/tvastra_plus").get(pages.tvastra_plus);
// router.route("/signin_otp").post(loginController.signin_otp);
router.route("/otp").post(loginController.otp);
router.route("/signin").post(loginController.signin);
router.route("/signup").post(loginController.signup);
router.route("/signOut").post(loginController.signOut);

module.exports = router;