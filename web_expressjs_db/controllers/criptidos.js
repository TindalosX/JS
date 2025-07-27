import { CriptidoModel } from '../models/criptido.js';
import { validateCriptido } from '../schemas/criptidos.js';

export class CriptidoController {
	static async getByName (req, res){
		const { name } = req.query;

		const criptido = await CriptidoModel.getByName( {name} );

		res.send(criptido);
	}

	static async create (req, res) {
		const method = req.method.toLowerCase();
		
		const { value, error } = validateCriptido(method, req.body);
		
		if (error) {
			const messError = error.details[0].message;
			
			//~ return res.status(400).json({ "mensaje error": error.details[0].message})
			return res.status(400).send({"Error": messError});
		}

		const nuevoCriptido = await CriptidoModel.create(value);
		console.log("Criptido agregado. express");
		
		res.status(201).send(value);
	}

	static async update (req, res) {
		const method = req.method.toLowerCase();

		const { value, error } = validateCriptido(method, req.body);

		if (error) {
			console.log("Ocurrio error")
			return res.status(400).send({"Error": error.details[0].message});
		} 

		const { id }= req.params;

		const actualizacionCriptido = await CriptidoModel.update({id, input: value})

		if (actualizacionCriptido === false) {
			return res.status(404).send({mensaje: "Criptido no encontrado"});
		}

		console.log("Actualización de criptido");
		res.send(actualizacionCriptido);
	}
}
