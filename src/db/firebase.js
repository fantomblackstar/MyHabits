import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { get, getDatabase, ref, update, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBtdnK1UX3KeZfS-qEE7fYwvTDh34cX-d8",
    authDomain: "myhabits-app.firebaseapp.com",
    databaseURL: "https://myhabits-app-default-rtdb.firebaseio.com",
    projectId: "myhabits-app",
    storageBucket: "myhabits-app.appspot.com",
    messagingSenderId: "593515812632",
    appId: "1:593515812632:web:bc3ac1929fd7c926e7f06d"
};

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
const dbRef = ref(db);

export async function GoogleSignIn() {
    return await signInWithPopup(auth, provider)
        .then((result) => {
            const { displayName, email, uid } = result.user;
            return [displayName, email, uid]
        }).catch((error) => {
            console.error(error.message)
            return []
        })
}

export async function getDataDb(path) {
    let res = false
    await get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            res = snapshot.val()
        }
    }).catch((error) => {
        console.error(error);
    });
    return res
}

export async function writeDataDb (path, updates) {
    const newUpdates = {};
    newUpdates[`${path}`] = updates
    return update(ref(db), newUpdates);
}

export async function getHabitsDataDb(uid) {
    let res = false
    await get(child(dbRef, `Habits/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let habits = Object.entries(snapshot.val())
            habits = habits.filter(elem => elem[1].finished === false)
            res = Object.fromEntries(habits)
        }
    }).catch((error) => {
        console.error(error);
    });
    return res
}
