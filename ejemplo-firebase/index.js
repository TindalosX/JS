import { searchCryptid, createCryptid, updateCryptid, deleteCryptid} from './crud.js'

//key de la informacipon a buscar.
let nombre = 'mothman';

// ¿Por qué funciona? El await si no está dentro de una función async.
//Fuciona porque el entorno de Node.js con módulos ES activados. Si no
//de debe usar then() o debe estar dentro de otra función async.

//-> Buscar criptido.
//-------OK----------
/*const {error, data} = await searchCryptid(nombre);

if (error) {
	console.log(error);
}
if (data !== null) {
	console.log("Mostrando información del criptido...");

	console.log("Nombre:", data.nombre);
	console.log("Tipo:", data.tipo);
} else {
	console.log("No se encontro al criptido");
}*/
//---------------OK--

//-> Agregar datos el id es autogenerado por Firebase.
//-------OK----------
//Datos a agregar.
/*const newCriptido = {
	nombre: "nokotan",
	tipo: [
		"híbidro"]
}

const {error, message} = await createCryptid(newCriptido);
if (error) {
	console.log(error);
}else {
	console.log(message);
}*/
//--------------OK--

//->Actualizar/Modificar datos.
//--------OK---------
/*nombre = 'nokotan';
const newData = {
	description: "Híbrido entre humano y venado"
}

const { error, message } = await updateCryptid(nombre, newData);

if (error) {
	console.log('Error');
	console.log(error);
} else {
	console.log('OK');
	console.log(message);
}*/
//--------------OK--

//-> Eliminar registro.
//-------OK----------
//~ const { error, message } = await deleteCryptid(nombre);

//~ if (error) {
	//~ console.log(error);
//~ } else {
	//~ console.log(message);
//~ }
//--------------OK--
