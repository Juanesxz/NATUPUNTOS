// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updatePassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0wE3Dube95qbfIpE1a1L84_6zot_Nisw",
    authDomain: "natupuntos-1bebf.firebaseapp.com",
    databaseURL: "https://natupuntos-1bebf-default-rtdb.firebaseio.com",
    projectId: "natupuntos-1bebf",
    storageBucket: "natupuntos-1bebf.appspot.com",
    messagingSenderId: "944154940336",
    appId: "1:944154940336:web:2d551a0277a79516443c75",
    measurementId: "G-3DQ0RFT10C",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const app2 = initializeApp(firebaseConfig, "app2");
export const auth2 = getAuth(app2);
export const firestore = getStorage(app);


export async function uploadFile(file, uid) {
    const storageRef = ref(firestore, "companyphotos/" + uid);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}

export async function uploadSupport(file, uid, lastModified) {
    const storageRef = ref(firestore, `businesssupports/${uid}/${lastModified}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}

export async function CarouselImg(file) {
    const storageRef = ref(firestore, `dashboard/imagen1`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}
export async function CarouselImg2(file) {
    const storageRef = ref(firestore, `dashboard/imagen2`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}
export async function CarouselImg3(file) {
    const storageRef = ref(firestore, `dashboard/imagen3`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}


export async function adminnewpassword(newPassword) {
    const auth = getAuth();
    const userpass = auth.currentUser;
    updatePassword(userpass, newPassword);
}
