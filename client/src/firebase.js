/**
 * Configuración de Firebase
 * 
 * Este archivo inicializa la conexión con Firebase para:
 * - Authentication (autenticación de usuarios)
 * - Firestore (base de datos, usado en el backend)
 * 
 * Las credenciales se obtienen de Firebase Console:
 * Project Settings > General > Your apps > Web app
 */

// Importar funciones necesarias de Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración de tu aplicación web de Firebase
// IMPORTANTE: Estas credenciales son específicas de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyBO-v77HC8JZI_sgoV3YTHPSpih000KSBo",
    authDomain: "ecommerce-4e23f.firebaseapp.com",
    projectId: "ecommerce-4e23f",
    storageBucket: "ecommerce-4e23f.firebasestorage.app",
    messagingSenderId: "731680837971",
    appId: "1:731680837971:web:6284a9853745926354d1a6",
    measurementId: "G-GG5M52XLDE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la instancia de autenticación para usar en toda la app
export const auth = getAuth(app);

// Exportar la app por si se necesita en otros módulos
export default app;
