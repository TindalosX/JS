// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, onValue, set } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //Aquí van los datos del objeto de configuración para la app.
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Iniciliza RealTime Database y obtienen una instancia
//al servicio.
const db = getDatabase(app);

const dbRef = ref(db); //Referencia a la raíz de la base de datos.

const idCriptido = '12345';

//Construye la  ruta exacta de los datos solicitados.
const refCriptido = child(dbRef, `recientes/${idCriptido}`);

//Lee los datos una sola vez. --OK--
//~ get(refCriptido).then( snapshot => {
	//~ console.log("Info CRiptido");
	//~ console.log(snapshot.val()); //Con val() rerecuperan los datos.
//~ }).catch((error) => {
  //~ console.error("¡Hubo un error al leer los datos!", error);
//~ });

//Leer los datos y escuchar los cambios se utiliza onValue(). --OK--
//~ onValue(refCriptido, snapshot => {
	//~ console.log(snapshot.val());
//~ })

// ¡Consejo PRO! (Gemini IA) Si solo quieres el valor una vez, pero con la sintaxis de listener,
// puedes añadir { onlyOnce: true } al final del onValue:
/*
onValue(postsRef, (snapshot) => {
  // ... tu código
}, {
  onlyOnce: true
}, (error) => {
  // ... manejo de error
});
*/

//Agregar datos a una ruta con set(), reemplaza cualquier dato existente.
// --OK
const newCriptido = {
	id: "12345",
	nombre: "nokotan",
	tipo: [
		"humano",
		"venado"]
}

const refRecientes = child(dbRef, `recientes/${newCriptido.id}`);

set(refRecientes, newCriptido);
// OK--



//~ https://firebase.google.com/docs/admin/setup?authuser=0&hl=es-419#prerequisites
