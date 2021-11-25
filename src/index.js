import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkP9ksYPulu7jCp8nDqa4jsRfiZ7EitnE",
    authDomain: "getting-started-with-fir-30780.firebaseapp.com",
    projectId: "getting-started-with-fir-30780",
    storageBucket: "getting-started-with-fir-30780.appspot.com",
    messagingSenderId: "353703001954",
    appId: "1:353703001954:web:3811c83d266a3dac2eb63b",
};

// init firebase app
initializeApp(firebaseConfig);
// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
            books.push({ id: doc.id, ...doc.data() });
        });
        console.log(books);
    })
    .catch((err) => {
        console.log(err);
    });

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    }).then(() => {
        addBookForm.reset();
    });
});

// delete a document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const docRef = doc(db, "books", deleteBookForm.id.value);
    deleteDoc(docRef).then(() => {
        deleteBookForm.reset();
    });
});
