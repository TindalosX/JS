import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //Aquí van los datos del objeto de configuración para la app.
};

// Inicializa la app con la configuración de firebaseConfig.
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
