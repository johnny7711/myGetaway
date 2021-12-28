import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const createUser = functions.auth.user().onCreate(async (user) => {
  functions.logger.info('onCreate User', {structuredData: true})
  await db.collection('users').doc(user.uid).set({
    displayname: user.displayName
  })
})
