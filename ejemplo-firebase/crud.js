// Import the functions you need from the SDKs you need
import { db } from './configFB.js'; //Importación de la inicialización de firebase.
import { ref, child, get, set, update, push, remove, query, orderByChild, equalTo } from 'firebase/database';

// Referencia a la raíz de la base de datos.
//ref() retorna una Referencia que representa la ubicación en la
//Database de la ruta dada. Si no se proporciona una ruta la Referencia
//apunta a la raíz de la Database.
const dbRef = ref(db);

// Propiedades de la referencia devuelta de ref(), key, parent, root
//~ console.log("dbRef key->", dbRef.key);

async function searchCryptid(name) {
	
	try {
		// Construye la ruta exacta de los datos solicitados.
		//child(parent, path) Obtiene una Reference para la ubicación de la ruta
		//relativa dada. Retorna DatabaseReference, la ubicación del hijo (child)
		const refCriptidos = child(dbRef, `criptidos/`);

		//~ // Propiedades de la referencia devuelta de child() key, parent,root
		//~ console.log("dbRef key->", refCriptido.key); //id del criptido

		// query(), Crea una nueva instancia inmutable de Query que se extiende para
		//incluir también restricciones de consulta adicionales.
		//Recibe los siguientes parámetros:
		//Query: La instancia Query que se utiliza como base para las nuevas restricciones.
		//QueryConstraint[]: La lista de QueryConstraints a aplicar.
		//-> A Query sorts and filters the data at a Database location so only a subset of
		//	the child data is included. 
		//Signature: query(Query, QueryConstraint[])
		//Retorna: Query, The DatabaseReference for the Query's location.
		const resultQuery = await query(refCriptidos, orderByChild('nombre'), equalTo(name));
		//~ console.log(resultQuery.key);

		// get() obtiene el resultado más actual para esta consulta. Recibe
		//como parametro una consulta (query). Retorna Promise<DataSnapshot>.
		//Promesa que se resuelve con DataSnapshot (datos), si hay un valor disponble.
		//The DataSnapshot's contents as a JavaScript value (Object, Array, string,
		//number, boolean, or null).
		const snapshot = await get(resultQuery);

		const result = [];
		if (snapshot.exists()) {
			snapshot.forEach(childSnapshot => {
				//~ console.log(snapshot.key)
				result.push(childSnapshot.val());
			});
			return {"data": result[0]}; //Si solo se espera un registro. 
		}
		return {"data": null};
		
	} catch (error) {
		if (error.message === "Permission denied") {
			return {"error": "No se puede acceder a la base de datos."}
		}

		return { "error": `Ocurrió un error inesperado: ${error.message}`}
	}
}

// Crear un registro.
//Genera un nodo hijo utilizando una clave única y devuelve su referencia.
//Si se provee un valor a el método push(), el valor se escribe en la
//locación generada.
//Si no se pasa ningun valor no se escribe nada en la base de datos y el
//nodo hijo permance vacío, y la referencia se puede usar en otra parte.
//Retorna: ThenableReference una combinación de una Promesa y una Referencia;
//que se resuelve cuando se completa la escritura.
//Thenable tiene las siguientes propiedades: key y parent.
async function createCryptid(input) {

	const refCriptidos = child(dbRef, `criptidos/`);
	
	try {

		const isInDatabase = await searchCryptid(input.nombre);
		if (isInDatabase.data !== null) {
			return {"message": "El registro ya existe"};
		}
		
		await push(refCriptidos, input);

		return { "message": "Los datos se guardaron correctamente." };
	}
	catch (error) {
		// Este error ocurre si falla la red o por permisos de la base de datos.
		if (error.code === "PERMISSION_DENIED") {
			return { "error": "Error al guardar los datos."};
		} else if (error.code === "NETWORK_ERROR") {
			return { "error": "Problema de conexión a la red. Intenta de nuevo más tarde."};
		} else {
			return { "error": `Ocurrió un error inesperado: ${error.message}`};
		}
	}
}

// Actualizar un registro.
//El método update() puede escribir mútiples valores a la base de datos a la vez
//sin sobrescribir los nodos hijos.
//Parametros:
//	DataReference: The location to write to.
//	object; Object containing multiple values.
//Retorna una Promise<void> esta promesa indica que la operación se completo
//con exito.

// Actualizar una sola propiedad en una sola ubicación con update().
async function updateCryptid(name, input) {

	const refCryptids = child(dbRef, `criptidos/`);

	try {
		const resultQuery = await query(refCryptids, orderByChild('nombre'), equalTo(name));
		const snapshot = await get(resultQuery);

		if (snapshot.exists()) {

			let snapshotKey = '';
			
			snapshot.forEach(childSnapshot => {
				snapshotKey = childSnapshot.key;
			})

			const refCryptid = child(refCryptids, snapshotKey);

			await update(refCryptid, input);

			return { "message": "Datos actualizados correctamente."}
		}
		
		return { "message": `No se encontro el registro: ${name}`}
	}
	catch (error) {
		if (error.code === "PERMISSION_DENIED") {
			return { "error": "Error al actualizar los datos."};
		} else if (error.code === "NETWORK_ERROR") {
			return { "error": "Problema de conexión a la red. Intenta de nuevo más tarde."};
		} else if (error.message === "Permission denied") {
			return {"error": "No se puede acceder a la base de datos."}
		} else {
			return { "error": `Ocurrió un error inesperado: ${error.message}`};
		}
	}
}

// Eliminar un registro.
//remove() eliminar los datos en una referencia a la ubicación de esos datos.
// Retorna: Promise<void> esta promesa indica que la operación se completo
//con exito.
async function deleteCryptid(name) {
	
	const refCryptids = child(dbRef, `criptidos/`);

	try {
		const resultQuery = await query(refCryptids, orderByChild('nombre'), equalTo(name));
		const snapshot = await get(resultQuery);

		if (snapshot.exists()) {

			let snapshotKey = '';
			
			snapshot.forEach(childSnapshot => {
				snapshotKey = childSnapshot.key;
			})

			const refCryptid = child(refCryptids, snapshotKey);

			await remove(refCryptid);

			return {"message": "Datos eliminados."}
		}
		
		return {"message": `No se encontro el registro: ${name}`}
	}
	catch (error) {
		if (error.code === "PERMISSION_DENIED") {
			return { "error": "Error al borrar los datos."};
		} else if (error.code === "NETWORK_ERROR") {
			return { "error": "Problema de conexión a la red. Intenta de nuevo más tarde."};
		} else {
			return { "error": `Ocurrió un error inesperado: ${error.message}`};
		}
	}
}

export { searchCryptid, createCryptid, updateCryptid, deleteCryptid};
