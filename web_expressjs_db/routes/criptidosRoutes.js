// Clase express.Router para crear controladores de rutas
//modulares y montables.
import { Router } from 'express';

import { validateCriptido } from '../schemas/criptidos.js';

import { CriptidoModel } from '../models/criptido.js' //Importa el modelo del criptido.

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

	const criptido = CriptidoModel.getByName( {name} );

	res.send(criptido);
	
});

//Crear criptido.
routerCriptidos.post('/', (req, res) => {
	const method = req.method.toLowerCase();
	
	//Usando Joi.
	const { value, error }= validateCriptido(method, req.body);
	
	if (error) {
		const messError = error.details[0].message;
		
		//~ return res.status(400).json({ "mensaje error": error.details[0].message})
		return res.status(400).send({"Error": messError});
	}

	const nuevoCriptido = CriptidoModel.create(value);
	console.log("Criptido agregado. express");
	
	res.status(201).send(value);
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

	const actualizacionCriptido = CriptidoModel.update({id, input: value})

	if (actualizacionCriptido === false) {
		return res.status(404).send({mensaje: "Criptido no encontrado"});
	}

	console.log("Actualización de criptido");
	res.send(actualizacionCriptido);
});






