const { db } = require("../utils/firebaseUtils")

exports.getUserFiles = (req, res) => {
    const uid  = req.uid;
    const docRef = db.collection("users").doc(uid).collection("resources").doc("root");
    docRef.get()
    .then((doc) => {
        if (doc.exists) {
            return res.status(200).send(doc.data())
        } else {
            return res.status(500).send("Not Found")
        }
    })
    .catch((error) => {
        return res.status(500).send(error)
    });
}