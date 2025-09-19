//~ import { CriptidoModel } from '../models/criptido.js';
import { CriptidoModel } from '../models/firebase/criptido.js';
import { validateCriptido } from '../schemas/criptidos.js';

export class CriptidoController {
	static async getByName (req, res){
		const { name } = req.query;

		const {error, data } = await CriptidoModel.getByName( {name} );

		if (error) {
			return res.status(403).send(error);
		}

		if (data === null) {
			return res.status(200).send({"message": "No se encontraron datos."});
		} else {
			return res.status(200).send(data);
		}
	}

	static async create(req, res) {
		const method = req.method.toLowerCase();
		
		const { value, error } = validateCriptido(method, req.body);
		
		if (error) {
			const messError = error.details[0].message;
			return res.status(400).send({"Error": messError});
		}

		const resultCreate = await CriptidoModel.create(value);

		if (resultCreate.error) {
			return res.status(403).send({"Error": resultCreate.error});
		}

		if (resultCreate.message) {
			return res.status(200).send({"message": resultCreate.message});
		}

		const messageCreate = resultCreate.message;
		
		res.status(201).send({ messageCreate: value });
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
