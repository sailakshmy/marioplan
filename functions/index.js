const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const createNotification = ((notification) => {
  return admin.firestore()
  .collection('notifications')
  .add(notification)
  .then(doc => console.log('Notification added ', doc))
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello  World from Firebase!");
});

exports.projectCreated = functions.firestore
  .document('projects/{projectId}') // This will refer to a specific document
  .onCreate((doc)=>{ // whenever a new project is created, we will fire the callback function
  //This callback function will notify the user that a new project has been added
  const project = doc.data();//The data inside this consists of the details like title, content, createdBy etc
  const notification = {
    content : 'Created a new project',
    user : `${project.authorFirstName} ${project.authorLastName}`,
    time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification);
});

exports.userJoined = functions.auth
  .user() // This trigger will fire when a user has been created using the auth service
  .onCreate(user => {
    return admin.firestore().collection('users')
      .doc(user.uid)
      .get()
      .then(doc =>{
        const newUser = doc.data();
        const notification = {
          content: 'Joined the application',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
      })
})