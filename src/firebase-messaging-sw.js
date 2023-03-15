import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// import firebaseConfig from './config/firebase'

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const firebaseConfig = {
    apiKey: "AIzaSyAiXB7EVWRMNRDMwEkX-cmD6ZJwoyBMdP4",
    authDomain: "hello-world-firebase---fred.firebaseapp.com",
    projectId: "hello-world-firebase---fred",
    storageBucket: "hello-world-firebase---fred.appspot.com",
    messagingSenderId: "368522360124",
    appId: "1:368522360124:web:5b363da1d3bbb22f135a39",
    measurementId: "G-H6R3XF0K0E"
}

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');

            // Get FCM Token
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            const db = getFirestore(app);

            getToken(messaging, { vapidKey: 'BOt36umIJSCVjYeg77sIREmvsPJfgibocsQEty1inQrsRVtpA08Z8UY_r7PsCscxEK6Hh2MahKFxoLb6vxoNAM4' }).then(async (currentToken) => {
                if (currentToken) {
                    // Send the token to your server and update the UI if necessary
                    // ...
                    console.log('Token', currentToken)

                    // insert db
                    try {
                        const docRef = await addDoc(collection(db, "notification_token"), {
                            token: currentToken
                        });
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }

                    // show token
                    let tokenDOM = document.createElement('div');
                    tokenDOM.appendChild(document.createTextNode(currentToken));
                    document.getElementById('load').prepend(tokenDOM);


                } else {
                    // Show permission request UI
                    console.log('No registration token available. Request permission to generate one.');
                    alert('Failed to push notification')
                    // ...
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
            });
        } else {
            console.log('Failed to grant permission')
        }
    })
}

requestPermission();