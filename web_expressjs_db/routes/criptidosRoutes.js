// Clase express.Router para crear controladores de rutas
//modulares y montables.
import { Router } from 'express';

import { CriptidoModel } from '../models/criptido.js' //Importa el modelo del criptido.
import { CriptidoController } from '../controllers/criptidos.js' //Importa el modelo del criptido.

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
routerCriptidos.get('/', CriptidoController.getByName);

//Crear criptido.
routerCriptidos.post('/', CriptidoController.create);

//Actualizar criptido
routerCriptidos.patch('/:id', CriptidoController.update);


