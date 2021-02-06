import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from the Hiya! Team");
});

exports.getNewUserID = functions.https.onRequest((req, res) => {
    let randId;
    do {
        randId = makeid(8);
    } while (!checkUserExists(randId))
    const user = db.collection('users').doc(randId);
    const userData = {
        friends: [],
        nickname: randId,
        created: admin.firestore.FieldValue.serverTimestamp(),
        messageQueue: {}
    };

    user.set(userData).catch(err => res.status(500).send("Internal server error"));
    res.send({ userid: randId });
});

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.getUserByID = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    console.log(userid);
    if (!checkUserIDValid(userid)) {
        res.status(400).send('Malformed userid');
    } else {
        const userRef = db.collection('users').doc(userid);
        userRef.get().then(doc => {
            if (doc.exists) {
                res.send(doc.data());
                console.log(doc.data());
            } else {
                res.status(400).send('`userid` does not exist')
            }
        }).catch(e => res.status(500).send('Internal server error'));
    }
});

exports.getUserMessageQueue = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    console.log(userid);
    if (!checkUserIDValid(userid)) {
        res.status(400).send('Malformed userid');
    } else {
        const userRef = db.collection('users').doc(userid);
        userRef.get().then(doc => {
            if (doc.exists) {
                const data = doc.data() || { messageQueue: {} };
                res.send(data.messageQueue);
                console.log(doc.data());
            } else {
                res.status(400).send('`userid` does not exist')
            }
        }).catch(e => res.status(500).send('Internal server error'));
    }
});

exports.addFriend = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    const friendid = String(req.get('friendid'));
    console.log(userid + ' ' + friendid);

    if (!checkUserIDValid(userid)) {
        res.status(400).send('Malformed userid');
    } else if (!checkUserIDValid(friendid)) {
        res.status(400).send('Malformed friendid');
    } else {
        db.collection('users').doc(friendid).get().then(doc => {
            if (doc.exists) {
                const userRef = db.collection('users').doc(userid);
                userRef.get().then(userDoc => {
                    if (userDoc.exists) {
                        const data = userDoc.data() || { friends: [] }
                        const friendsList: Array<string> = data.friends;
                        if (friendsList.includes(friendid)) {
                            res.status(400).send("friend already exists");
                        } else {

                            friendsList.push(friendid);

                            userRef.set({
                                ...data,
                                friends: friendsList
                            }).catch(e => res.status(500).send('Internal server error'));
                            res.status(200).send("friend added.")
                        }
                    } else {
                        res.status(400).send("userid does not exist.")
                    }
                }).catch(e => res.status(500).send('Internal server error'));
            } else {
                res.status(400).send("friendid does not exist.")
            }
        }).catch((e) => {
            console.error(e);
            res.status(500).send("Internal server error.");
        });

    }
});

function checkUserIDValid(userid: string) {
    const regex: RegExp = /\w{8}/;
    return regex.test(userid);
}

async function checkUserExists(userid: string) {
    const userRef = db.collection('users').doc(userid);
    const doc = await userRef.get();
    console.log('Does ' + userid + ' exist? ' + doc.exists);
    return doc.exists;
}

exports.getFriends = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    console.log(userid);
    if (!checkUserIDValid(userid)) {
        res.status(400).send('Malformed userid');
    } else {

        const userRef = db.collection('users').doc(userid);
        userRef.get().then(doc => {
            if (doc.exists) {
                const friends = doc.data()?.friends || []
                res.send({ friends: friends });
                console.log(friends);
            } else {
                res.status(400).send('Invalid value for `userid`')
            }
        }).catch(e => res.status(500).send('Internal server error'));
    }
});

exports.markMessageSeen = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    const messageid = String(req.get('messageid'));
    if (!checkUserIDValid(userid)) {
        res.status(400).send('Malformed userid');
    } else if (!checkUserExists(userid)) {
        res.status(400).send('`userid` does not exist.');
    } else {
        // Get user messages
        const userRef = db.collection('users').doc(userid);
        userRef.get().then(doc => {
            const data = doc.data() || {}
            const messages = data.messageQueue || {};
            delete messages[messageid];

            const seenPath = 'messageQueue.' + messageid + '.seen';

            userRef.update({ [seenPath]: true }).then(() => {
                res.send('Message marked as seen');
            }).catch(e => { console.error(e); res.status(500).send("Internal server error"); });
        }).catch(e => { console.error(e); res.status(500).send("Internal server error"); });
    }

});

exports.sendMessage = functions.https.onRequest((req, res) => {
    const senderid = String(req.get('senderid'));
    const recipientid = String(req.get('recipientid'));
    const message = String(req.get('message'));

    if (!checkUserIDValid(senderid)) {
        res.status(400).send('Malformed userid');
    } else if (!checkUserIDValid(recipientid)) {
        res.status(400).send('Malformed userid');
    } if (!checkUserExists(senderid)) {
        res.status(400).send('`senderid` does not exist.');
    } else if (!checkUserExists(recipientid)) {
        res.status(400).send('`recipientid` does not exist.');
    } else {
        const messageRef = db.collection('messageQueue').doc();
        messageRef.set({
            senderid: senderid,
            recipientid: recipientid,
            created: admin.firestore.FieldValue.serverTimestamp(),
            message: message,
            sent: false
        }).then(() => res.send('Message sent')).catch(e => res.status(500).send('Message failed to send.'));
    }
});

exports.onMessageAddedToQueue = functions.firestore.document('messageQueue/{messageId}').onCreate((change, context) => {
    const values = change.data();
    const messageid = change.id;
    const senderid = values.senderid;
    const recipientid = values.recipientid;
    const timeSent = values.created;
    const message = values.message;

    const recipientRef = db.collection('users').doc(recipientid);
    const path: string = "messageQueue." + messageid;
    recipientRef.update({
        [path]: {
            message: message,
            from: senderid,
            at: timeSent,
            seen: false
        }
    }
    ).then(() => {
        db.collection('messageQueue').doc(messageid).update({ sent: true }).catch(() => { console.error('Unable to set value sent to true for ' + messageid) });
    }).catch(() => {
        console.log("Error adding message to " + recipientid + " with messageid " + messageid)
    });
    return true;
});