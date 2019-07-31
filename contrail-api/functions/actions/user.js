const { auth, db } = require("../utils/firebaseUtils");

exports.getUserFiles = (req, res) => {
    const uid = req.uid;
    const docRef = db.collection("users").doc(uid).collection("root").doc("resources");
    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(200).send(doc.data())
            } else {
                return res.status(401).send("Not Found")
            }
        })
        .catch((error) => {
            return res.status(500).send(error)
        });
}

listAllUsers = () => {
    return new Promise((resolve, reject) => {
        const allUsers = [];
        return auth.listUsers()
            .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    const userData = userRecord.toJSON();
                    allUsers.push(userData);
                });
                return resolve(allUsers);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

exports.searchUsers = (req, res) => {
    const query = (req.query.where_query).toLowerCase();
    return listAllUsers()
        .then((users) => {
            const matchUsers = users.filter((user) => user.email.toLowerCase().includes(query) || user.displayName.toLowerCase().includes(query));
            return res.status(200).send(matchUsers);
        })
        .catch((error) => {
            return res.status(500).send(error);
        })
}