import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from the Hiya! Team");
});

exports.getNewUserID = functions.https.onRequest((req, res) => {
    let randId;
    do{
        randId = makeid(8);
    }while(!checkUserExists(randId))
    const user = db.collection('users').doc(randId);

    const userData = {
        friends:[],
        nickname: randId,
        created:admin.firestore.FieldValue.serverTimestamp()};

    user.set(userData).catch(err=>res.status(500).send("Internal server error"));
    res.send({userid:randId});
});

function makeid(length: number) {
   let result           = '';
   const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   const  charactersLength = characters.length;
   for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

exports.getUserByID = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    console.log(userid);

    const userRef = db.collection('users').doc(userid);
    userRef.get().then(doc => {
        if (doc.exists){
            res.send(doc.data());
            console.log(doc.data());
        } else {
            res.status(400).send('Invalid value for `userid`')
        }
    }).catch(e => res.status(500).send('Internal server error'));
});

exports.addFriend = functions.https.onRequest((req, res) => {
    const userid = String(req.get('userid'));
    const friendid = String(req.get('friendid'));
    console.log(userid + ' ' + friendid);

    if(checkUserExists(friendid)){
            const userRef = db.collection('users').doc(userid);
            userRef.get().then(doc=>{
                if(doc.exists){ 
                    const data = doc.data() || {friends:[]}               
                    const friendsList = data.friends;
                    friendsList.push(friendid);

                    userRef.set({
                        ...data,
                        friends:friendsList
                    }).catch(e=>res.status(500).send('Internal server error'));
                    res.status(200).send("friend added.")
                }else{
                    res.status(400).send("userid does not exist.")
                }
            }).catch(e=>res.status(500).send('Internal server error'));    
    }else{
        res.status(400).send("friendid does not exist.")
    }
});

async function checkUserExists(userid: string){
    const userRef = db.collection('users').doc(userid);
    const doc = await userRef.get();
    console.log('Does ' + userid + ' exist? ' + doc.exists);
    return doc.exists;
}