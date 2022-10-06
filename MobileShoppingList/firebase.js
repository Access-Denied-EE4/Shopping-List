import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence} from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAteV2w78EM0zrd13Q-9ycPBjyxiuY51I",
    authDomain: "shopping-list-wits.firebaseapp.com",
    projectId: "shopping-list-wits",
    storageBucket: "shopping-list-wits.appspot.com",
    messagingSenderId: "186447090602",
    appId: "1:186447090602:web:0970f63956c1140bd991d3",
    measurementId: "G-1D1Z52WMBB"
};

// Initialize Firebase
let app;
if (firebase.apps.length==0){
    app=firebase.initializeApp(firebaseConfig);
}
else{
    app=firebase.app()
}
export const db = getFirestore(app);
export const storage = getStorage(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
    });

    export { auth };



