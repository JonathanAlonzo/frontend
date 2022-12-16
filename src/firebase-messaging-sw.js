// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    projectId: 'noteapp-28d30',
    appId: '1:107122058357:web:250336ba6cfb880077c43c',
    storageBucket: 'noteapp-28d30.appspot.com',
    apiKey: 'AIzaSyA566nAa6PPLhL67s67tA_2S8bteREeZ-0',
    authDomain: 'noteapp-28d30.firebaseapp.com',
    messagingSenderId: '107122058357',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();