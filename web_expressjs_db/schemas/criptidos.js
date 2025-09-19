//~ const Joi = require('joi')
import Joi from 'joi'

const schemaCriptido = Joi.object({
	//~ id: Joi.string().alphanum().min(6).max(16).
		//~ required().
		//~ messages({
			//~ 'string.min': `id debe tener un mínimo de {#limit} caracteres`,
			//~ 'string.max': `id debe tener un máximo de {#limit} caracteres`,
			//~ 'any.required': `id es un campo obligatorio.`,
			//~ 'string.empty': `id no puede ser vacío.`
	//~ }),
	nombre: Joi.string().min(6).max(15).
		alter({
			post: (schemaCriptido) => schemaCriptido.required(),
			patch: (schemaCriptido) => schemaCriptido.optional(),
		}).
		messages({
			'string.min': 'El nombre debe tener al menos 6 caracteres',
			'string.max': 'El nombre debe tener un máximo de {#limit} caracteres',
			'string.empty': 'Introduce un nombre por favor.',
			'any.required': 'Nombre: es un campo obligatorio.'
		}),
	tipo: Joi.array().
		items(Joi.string().valid('acuatico', 'terrestre', 'volador', 'mitologico')).
		min(1).message({ 'array.min': "Se debe seleccionar al menos un tipo."}).
		max(3).message({ 'array.max': "No se aceptan más de 3 tipos."}).
		unique().messages({ 'array.unique': "No puede repetir tipos."}).
		alter({
			post: (schemaCriptido) => schemaCriptido.required(),
			patch: (schemaCriptido) => schemaCriptido.optional(),
		}).
		messages({'any.only': "Tipo inválido.", 'any.required': `tipo: es un campo obligatorio.`})
});

export function validateCriptido(method, input) {
	
	const schemaByMethod = schemaCriptido.tailor(method);

	return schemaByMethod.validate(input, {
		stripUnknown: {
			arrays: true,
			objects: true
		}
	});
}
