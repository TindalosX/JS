// Import the functions you need from the SDKs you need
import { db } from './confiDB.js'; //Importación de la inicialización de firebase.
import { ref, get, child, query, orderByChild, equalTo, push } from 'firebase/database';

//Iniciliza RealTime Database y obtienen una instancia
//al servicio.

export class CriptidoModel {
	static async getByName({ name }) {
		if (name) {
			try {
				console.log("Buscando nombre:", name);
				const dbRef = ref(db);
				const refCriptidos = child(dbRef, `criptidos/`);
				const resultQuery = await query(refCriptidos, orderByChild('nombre'), equalTo(name));
				const snapshot = await get(resultQuery);

				const result = [];
				if (snapshot.exists()) {
					snapshot.forEach(childSnapshot => {
						result.push(childSnapshot.val());
					});
					return {"data": result[0]};
				} else{
					return {"data": null};
				}
				
			} catch (error) {
				if (error.message === "Permission denied") {
					return {"error": "No se puede acceder a la base de datos."}
				}

				return { "error": `Ocurrió un error inesperado: ${error.message}`}
			}
		}
		return {"data":null};
	}

	static async create( input ){
		const dbRef = ref(db);
		const refCriptidos = child(dbRef, `criptidos/`);

		const name = input.nombre;
		try {

			const isInDatabase = await this.getByName( { name } );

			if (isInDatabase.data !== null) {
				return {"message": "El registro ya existe"};
			}
			
			await push(refCriptidos, input);

			return { "message": "Los datos se guardaron correctamente." };
		}
		catch (error) {
			// Este error ocurre si falla la red o por permisos de la base de datos.
			if (error.code === "PERMISSION_DENIED") {
				return { "error": "Hubo un error al guardar los datos."};
			} else if (error.code === "NETWORK_ERROR") {
				return { "error": "Problema de conexión a la red. Intenta de nuevo más tarde."};
			} else {
				return { "error": `Ocurrió un error inesperado: ${error.message}`};
			}
		}
	}
}

//~ async function obtenerInfoDeCriptido() {
    //~ try {
        //~ // 'await' pausa la ejecución de esta función hasta que la promesa se resuelva
        //~ let snapshot = await get(refCriptido);

        //~ if (snapshot.exists()) {
            //~ let infoCriptido = snapshot.val();
            //~ console.log("Info Criptido (usando async/await):", infoCriptido);
            //~ console.log("Modelo (usando async/await):", infoCriptido); // ¡Ahora sí verás el valor!
            //~ return infoCriptido; // Puedes devolver el valor directamente
        //~ } else {
            //~ console.log("No se encontraron datos para el críptido.");
            //~ return null; // O manejarlo como necesites
        //~ }
    //~ } catch (error) {
        //~ console.error("¡Hubo un error al leer los datos con async/await!", error.message);
        //~ throw error; // Propaga el error si es necesario
    //~ }
//~ }
