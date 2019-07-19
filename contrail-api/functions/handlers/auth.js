const { auth, db } = require("../utils/firebaseUtils");

exports.registerUser = (req, res) => {
    const { displayName, email, password } = req.body;

    if (displayName && email && password) {
        auth.createUser(req.body)
            .then((userRecord) => {
                console.log('userRecord')
                return db.collection("users").doc(userRecord.uid).set({
                    displayName: userRecord.displayName,
                    email: userRecord.email,
                    documents: {
                        owned: [],
                        sharedToUser: [],
                    },
                })
                .then(() => {
                    return auth.createCustomToken(userRecord.uid)
                        .then((customToken) => {
                            console.log('done')
                            return res.status(201).json({ customToken });
                        })
                        .catch((error) => {
                            return res.status(500).send();
                        })
                })
                .catch((error) => {
                    return res.status(500).send();
                })
            })
            .catch((error) => {
                return res.status(500).send();
            })
    }
}
