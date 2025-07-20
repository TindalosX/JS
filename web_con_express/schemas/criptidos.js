const Joi = require('joi')

const schemaCriptido = Joi.object({
	id: Joi.string().alphanum().min(6).max(16).
		required().
		messages({
			'string.min': `id debe tener un mínimo de {#limit} caracteres`,
			'string.max': `id debe tener un máximo de {#limit} caracteres`,
			'any.required': `id es un campo obligatorio.`,
			'string.empty': `id no puede ser vacío.`
	}),
	name: Joi.string().min(6).max(15).
		alter({
			post: (schemaCriptido) => schemaCriptido.required(),
			patch: (schemaCriptido) => schemaCriptido.optional(),
		}).
		messages({
			'string.min': 'nombre debe tener al menos 6 caracteres',
			'string.max': 'nombre debe tener un máximo de {#limit} caracteres',
			'string.empty': 'nombre no puede ser vacío.',
			'any.required': 'nombre: es un campo obligatorio.'
		}),
	type: Joi.array().
		items(Joi.string().valid('acuatico', 'terrestre', 'volador', 'mitologico')).
		min(1).message({ 'array.min': "Se debe definir al menos un tipo."}).
		max(3).message({ 'array.max': "No se aceptan más de 3 tipos."}).
		unique().messages({ 'array.unique': "No puede repetir tipos."}).
		alter({
			post: (schemaCriptido) => schemaCriptido.required(),
			patch: (schemaCriptido) => schemaCriptido.optional(),
		}).
		messages({'any.only': "Tipo inválido.", 'any.required': `tipo: es un campo obligatorio.`})
});

//~ function validateCriptido(object) {
	//~ return schemaCriptido.validate(object);
//~ }
function validateCriptido(method, input) {
	
	const schemaByMethod = schemaCriptido.tailor(method);

	return schemaByMethod.validate(input, {
		stripUnknown: {
			arrays: true,
			objects: true
		}
	});
}

module.exports = {
	validateCriptido
}

//~ const z = require('zod');

//~ const criptidoSchema = z.object({
	//~ id : z.string()
	//~ .min(1, {error: "El Id debe tener al menos 3 caracteres"
	//~ }),
	//~ name: z.string().min(6, {error: "El nombre debe tener al menos 6 caracteres"}),
	//~ type: z.string().min(6, {error: "El tipo debe tener al menos 6 caracteres"})
//~ });

//~ function validateCriptido(object) {
	//~ return criptidoSchema.safeParse(object)
//~ }
