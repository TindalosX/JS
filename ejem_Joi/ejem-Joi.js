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
			'string.min': `"id" debe tener un mínimo de {#limit} caracteres`,
			'string.max': `"id" debe tener un máximo de {#limit} caracteres`,
			'any.required': `"id" es un campo obligatorio.`,
			'string.empty': `"id" no puede ser vacío.`
	}),
	nombre: Joi.string().min(6, 'utf8').max(15).
		alter({
			post: (schemaCriptido) => schemaCriptido.required(),
			patch: (schemaCriptido) => schemaCriptido.optional(),
		}).
		messages({
			'string.min': '"nombre" debe tener al menos 6 caracteres',
			'string.max': '"nombre" debe tener un máximo de {#limit} caracteres',
			'string.empty': `"nombre" no puede ser vacío.`,
			'any.required': `"nombre" es un campo obligatorio.`,
			
		}),
	tipo: Joi.array().
		items(Joi.string().valid('acuatico', 'terrestre', 'volador', 'mitologico')).
		min(1).message({ 'array.min': "Se debe definir al menos un tipo."}).
		max(3).message({ 'array.max': "No se aceptan más de 3 tipos."}).
		unique().messages({ 'array.unique': "No puede repetir tipos."}).
		required()
	//~ firstSighting: Joi.number().integer().optional()
});

let criptido = {
	"id": '123456', //11111111111
	"nombre": "xyzabc",
	"tipo": [
		'terrestre',
		'mitologico',
		//~ 'mitologico',
		//~ 'acuatico',
		//~ 'volador'
		//~ 'color'
	]
	//~ "origen": "ref()"
}

//~ let res = schemaCriptido.validate(criptido);
//~ console.log(res)
//~ console.log()

//Validacion completa del esquema.
function validarCriptido(object) {
	return schemaCriptido.validate(object, {
		stripUnknown: {
			arrays: true,
			objects: true
		}
	});
}

// Desestructuración (destructuring) del método validate()
//~ const { value, error } = validarCriptido(criptido);

//~ if (error) {
	//~ console.log("A ocurrido un error en la validación");
	//~ console.log(error.details[0].message);
	//~ console.log(error.details[0].type);
//~ } else {
	//~ console.log("Validación correcta");
//~ }

//~ console.log(value);
//~ console.log();

//----Validación por Method.----
const schema = schemaCriptido.tailor('post')

const resByMethod = schema.validate(criptido)

console.log(resByMethod)

//~ function validarPorMetodo(method, object) {
	//~ const schema = schemaCriptido.tailor(method.toLowerCase())

	//~ return schema.validate(schema);
//~ }

//~ const method = 'POST';

//~ const { value, error } = validarPorMetodo(method, criptido);

//~ if (error) {
	//~ console.log("A ocurrido un error en la validación por método");
	//~ console.log(error.details[0].message);
	//~ console.log(error.details);
//~ } else {
	//~ console.log("Validación correcta");
//~ }
