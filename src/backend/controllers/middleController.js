function redirectSignin(req, res, next) {
    if (!req.session.userId) {
        res.redirect("/signin");
    } else {
        next();
    }
};

function redirectProfile(req, res, next) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        next();
    }
};

module.exports = {
    redirectSignin: redirectSignin,
    redirectProfile: redirectProfile
}