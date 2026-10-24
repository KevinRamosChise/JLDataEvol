/**
 * Firebase — Proyecto JL DATA PRO
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyCD-m47KnO6gqOISthbNv1DzRbco63Wnlg',
    authDomain: 'jldatapro-a8d38.firebaseapp.com',
    projectId: 'jldatapro-a8d38',
    storageBucket: 'jldatapro-a8d38.firebasestorage.app',
    messagingSenderId: '863810068620',
    appId: '1:863810068620:web:d5be8da30207849a2c9ba9'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
