// Clase express.Router para crear controladores de rutas
//modulares y montables.
import { Router } from 'express';

import criptidos from '../criptidos.json' with {type: 'json'} //Para importar archivos JSON en ESModules.
import { validateCriptido } from '../schemas/criptidos.js';

//Exportación de una instancia router.
export const routerCriptidos = Router();

//Registra el tiempo de recepción de cada solicitud HTTP.
//Se ejecuta cuando se recibe una solicitud HTTP en cualquier
//ruta del routerCriptidos.
const timeLog = (req, res,next) => {
	console.log('Time: ', Date.now());

	// next(), Permite que la solicitud continúe al siguiente
	//middleware o controlador en el cadena de procesamiento.
	next();
}

routerCriptidos.use(timeLog);

//Buscar criptido
routerCriptidos.get('/', (req, res) => {
	const { name } = req.query;
	
	if (name) {

		let infoCriptido = criptidos.find(criptido =>
			criptido.nombre.toLowerCase() === name.toLowerCase()
		);

		if (infoCriptido) {
			console.log(infoCriptido);
			return res.status(200).send(infoCriptido);
		}

		return res.status(400).send( {message: "No se encontro el criptido"});
	} else {
		res.send(criptidos);		
	}
});

//Crear criptido.
routerCriptidos.post('/', (req, res) => {
	const method = req.method.toLowerCase();
	
	//Usando Joi.
	const { value, error }= validateCriptido(method, req.body);
	
	if (error) {
		const messError = error.details[0].message;
		
		//~ return res.status(400).json({ "mensaje error": error.details[0].message})
		res.status(400).send({"Error": messError});
	} else{

		criptidos.push(value);
		console.log("Criptido agregado. express");
		
		res.status(201).send(value);
	}
});

//Actualizar criptido
routerCriptidos.patch('/:id', (req, res) => {
	const method = req.method.toLowerCase();

	const { value, error } = validateCriptido(method, req.body);

	if (error) {
		console.log("Ocurrio error")
		return res.status(400).send({"Error": error.details[0].message});
	} 

	const { id }= req.params;
	const criptidoIndex = criptidos.findIndex( criptido => criptido.id === id);

	if (criptidoIndex === -1) {
		return res.status(404).send({mensaje: "Criptido no encontrado"});
	}

	const actualCriptido = {
		...criptidos[criptidoIndex],
		...req.body
	}

	criptidos[criptidoIndex] = actualCriptido;
	res.send(actualCriptido);
});






