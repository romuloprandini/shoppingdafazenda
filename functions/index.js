const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shoppingdafazenda-bc0bb.firebaseio.com",
});

/**
 * Save the email to database
 */
exports.contactForm = functions.https.onRequest(async (req, res) => {
  // res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Credentials', 'true');

  // if (req.method.toUpperCase() === 'OPTIONS') {
  //   // Send response to OPTIONS requests
  //   res.set('Access-Control-Allow-Methods', 'POST');
  //   res.set('Access-Control-Allow-Headers', 'Authorization');
  //   res.set('Access-Control-Max-Age', '3600');
  //   res.status(204).send('');
  //   return;
  // }
  cors(req, res, async () => {
    if (req.method.toUpperCase() === "POST") {
      const msg = req.body;
      // Push the new message into Cloud Firestore using the Firebase Admin SDK.
      const writeResult = await admin
        .firestore()
        .collection("messages")
        .add({
          email: msg.email,
          name: msg.name,
          subject: `Novo contato de ${msg.name} recebido pelo site`,
          text: msg.subject,
          emailSent: false
        });
      // Send back a message that we've succesfully written the message
      res.status(200).send({
        id: writeResult.id,
        message: `Message with ID: ${writeResult.id} added.`,
      });
    } else {
      res.status(405).send("");
    }
  });
});

/**
 * This function will send the contact email to shoppingdafazenda email
 *
 * Set the gmail.email and gmail.password Google Cloud environment variables to match the
 * email and password of the Gmail account used to send emails (or the app password
 * if your account has 2-step verification enabled). For this use:
 * firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
 */
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmailNotification = functions.firestore
  .document("/messages/{documentId}")
  .onCreate(async (snap, context) => {
    // Grab the current value of what was written to Cloud Firestore.
    const msg = snap.data();

    // Building Email message.
    const mailOptions = {
      from: msg.email,
      to: gmailEmail,
      subject: msg.subject,
      text: msg.text
    };

    try {
      await mailTransport.sendMail(mailOptions);
      return snap.ref.set({emailSent: true}, {merge: true});
    } catch (error) {
      console.error("There was an error while sending the email:", error);
    }
    return null;
  });
