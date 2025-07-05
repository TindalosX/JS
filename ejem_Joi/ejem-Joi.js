const Joi = require('joi')

//~ const schemaCriptido = Joi.object({
	//~ id: Joi.string().required(),
	//~ nombre: Joi.string().required(),
	//~ tipo: Joi.array().items(Joi.string().valid('acuatico', 'terrestre', 'volador', 'mitologico')).required()
//~ }).length(3).unknown(false);

const schemaCriptido = Joi.object({
	id: Joi.string().alphanum().min(6).max(16).
		required().
		messages({
			//~ 'string.min': `"id" debe tener un mínimo de {#limit} caracteres`,
			//~ 'string.max': `"id" debe tener un máximo de {#limit} caracteres`,
			'any.required': `"id" es un campo obligatorio.`,
			'string.empty': `"id" no puede ser vacío.`
	}),
	nombre: Joi.string().min(6, 'utf8').max(15).required().messages({
		'string.min': '"nombre" debe tener al menos 6 caracteres'
		}),
	tipo: Joi.array().
		items(Joi.string().valid('acuatico', 'terrestre', 'volador', 'mitologico')).
		min(1).message({ 'array.min': "Se debe definir al menos un tipo."}).
		max(3).message({ 'array.max': "No se aceptan más de 3 tipos."}).
		unique().
		required(),
		//~ descripcion: Joi.string().empty().message({'any.empty': "Se debe proporcionar una descripción"})
		unNumero: Joi.number().ruleset.min(2).max(4).rule( { message : "El número debe estar en el rango [2, 4]"})
});

let criptido = {
	"id": '123451', //1234511111111111
	"nombre": "Mitológico",
	"tipo": [
		'terrestre',
		'mitologico',
		//~ 'mitologico',
		//~ 'mitologico',
		//~ 'acuatico',
		//~ 'volador'
		//~ 'color'
	],
	//~ "descripcion": ""
	"unNumero": 1
}

//~ let res = schemaCriptido.validate(criptido);
//~ console.log(res)
//~ console.log()


// Desestructuración (destructuring) del método validate()
const { value, error } = schemaCriptido.validate(criptido);

if (error) {
	console.log(error.details[0].message);
	console.log(error.details[0].type);
	//~ console.log(error.details);
} else {
	console.log("Criptido")
	console.log(value)	
}





