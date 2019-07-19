const { auth, db } = require("../utils/firebaseUtils");

exports.registerUser = (req, res) => {
    const { displayName, email, password } = req.body;

    if (displayName && email && password) {
        auth.createUser(req.body)
            .then((userRecord) => {
                return db.collection("users").doc(userRecord.uid).set({
                    displayName: userRecord.displayName,
                    email: userRecord.email,
                    documents: {
                        owned: [],
                        sharedToUser: [],
                    },
                }).then(() => {
                    return auth.createCustomToken(userRecord.uid)
                        .then((customToken) => {
                            return res.status(201).json({ customToken });
                        }).catch((error) => {
                            return res.status(500);
                        })
                }).catch((error) => {
                    return res.status(500);
                })
            }).catch((error) => {
                return res.status(500);
            })
    }
}
