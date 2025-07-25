import express, { json } from 'express';
//~ import criptidos from './criptidos.json' with {type: 'json'} //Para importar archivos JSON en ESModules.
//~ import { validateCriptido } from './schemas/criptidos.js';
import { routerCriptidos } from './routes/criptidosRoutes.js';

const app = express();

// Middleware para parsear JSON y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

app.use(express.static('public'));

// La app ahora puede manejar solicitudes a el prefijo /criptidos, cargando todas
//las rutas de routerCriptidos.
app.use('/criptidos', routerCriptidos);

app.listen(PORT, ()=> {
	console.log(`Servidor corriendo(${PORT})...`)
});
