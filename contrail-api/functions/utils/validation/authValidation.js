const { auth } = require("../firebaseUtils")

const emailRegex = RegExp(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const passwordRegex = RegExp(/^\S*$/);
const minDisplayNameLength = 3;
const minPasswordLength = 6;

exports.validateEmailandPassword = (email, password) => {
    let errors = {};
    if (email.trim().length === 0) {
        errors.email = "Email must not be empty."
    } else if (!(emailRegex.test(email.trim()))) {
        errors.email = "An invalid email was entererd."
    }

    if (!(password.length >= minPasswordLength)) {
        errors.email = "Password must contain at least 6 characters."
    } else if (!passwordRegex.test(password)) {
        errors.password = "Password must not contain whitespace."
    }

    return errors;
}

exports.validateRegisterInfo = (displayName, email, password) => {
    let errors = this.validateEmailandPassword(email, password);

    if (displayName === null || displayName.trim().length === 0) {
        errors.displayName = "Display name must not be empty."
    } else if (!(displayName.trim().length >= minDisplayNameLength)) {
        errors.displayName = "Display name must contain at least 3 characters."
    }

    return errors;
}

exports.authMiddleware = (req, res, next) => {
    const idToken = req.headers && req.headers.authorization;
    if (idToken) {
        return auth.verifyIdToken(idToken)
            .then((decodedToken) => {
                req.uid = decodedToken.uid;
                return next();
            }).catch((error) => {
                return res.status(500).send(error);
            });
    } else {
        return res.status(401).send("No token found");
    }
}