const express = require('express');

const criptidos = require('./criptidos.json');
const { validateCriptido } = require('./schemas/criptidos.js');

const app = express();

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

//~ const PORT = 3000;
const PORT = process.env.PORT ?? 3000;

app.use(express.static('public'));


//~ app.get('/criptidos', (req, res) => {
	//~ res.json(criptidos);
	//~ console.log("Primer get: todos los criptidos");
//~ });

//~ app.get('/criptidos', (req, res) => {

	//~ const { tipo } = req.query;
	
	//~ const tipoCriptidos = criptidos.filter(criptido => criptido.tipo === tipo);

	//~ if (tipoCriptidos) return res.send(tipoCriptidos);

	//~ res.status(400).json({"mensaje": `No se encontraron criptidos del tipo: ${tipo} `})
	
//~ });

// Obtener (buscar) criptido por nombre mediante form. Query Params.
app.get('/criptidos', (req, res) => {

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

// Agregar criptido mediante form.
app.post('/criptidos', (req, res) => {

	const method = req.method.toLowerCase();
	
	//Usando Joi.
	const { value, error }= validateCriptido(method, req.body);
	
	if (error) {
		console.log(error);
		const messError = error.details[0].message;
		
		//~ return res.status(400).json({ "mensaje error": error.details[0].message})
		res.status(400).send({"Error": messError});
	} else{

		criptidos.push(value);
		console.log("Criptido agregado. express");
		
		res.status(201).send(value);
	}
});


// Obtener criptido por parámetros de ruta
//~ '/criptido/:id/tipo/:tipo' ejemplo de una ruta
//~ app.get('/criptidos/:id', (req, res) => {
	//~ const { id } = req.params;

	//~ console.log(id);

	//~ let infoCriptido = criptidos.find(criptido => criptido.id === id);

	//~ if (infoCriptido) return res.send(infoCriptido);

	//~ res.send('Criptido no encontrado');
	
	//~ console.log(infoCriptido);
//~ })

//Actualizar criptido
app.patch('/criptidos/:id', (req, res) => {

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

	res.send(actualCriptido);
});


app.listen(PORT, ()=> {
	console.log(`Servidor corriendo(${PORT})...`)
});
