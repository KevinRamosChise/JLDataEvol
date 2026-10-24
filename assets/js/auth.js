/**
 * Autenticación Firebase — login y protección del dashboard
 */

import { auth } from './firebase-config.js';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const path = window.location.pathname;

if (path.includes('login')) {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const loginBtn = document.getElementById('login-btn');

    onAuthStateChanged(auth, (user) => {
        if (user) window.location.href = 'dashboard.html';
    });

    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const btnSpan = loginBtn.querySelector('span');

        loginBtn.disabled = true;
        if (btnSpan) btnSpan.textContent = 'Iniciando sesión...';
        loginError?.classList.remove('show');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            if (loginError) {
                loginError.textContent = getErrorMessage(error.code);
                loginError.classList.add('show');
            }
            loginBtn.disabled = false;
            if (btnSpan) btnSpan.textContent = 'Iniciar Sesión';
        }
    });
}

if (path.includes('dashboard')) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'login.html';
        }
    });

    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    });
}

function getErrorMessage(code) {
    const messages = {
        'auth/user-not-found': 'No existe una cuenta con este correo.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/invalid-email': 'Correo electrónico no válido.',
        'auth/invalid-credential': 'Credenciales inválidas.',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
        'auth/network-request-failed': 'Error de conexión.'
    };
    return messages[code] || 'Error al iniciar sesión. Verifica tus datos.';
}
