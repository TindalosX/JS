//Para importar archivos JSON en ESModules.
import criptidos from '../criptidos.json' with {type: 'json'}

//Crear la clase criptido.
export class CriptidoModel {

	//Método estático para obtener la información del criptido por su nombre.
	//El método recibe un objeto.
	static getByName({ name }) {
		if (name) {
			
			let infoCriptido = criptidos.find(criptido =>
				criptido.nombre.toLowerCase() === name.toLowerCase()
			);

			if (infoCriptido) {
				return infoCriptido;
			}
		}

		return criptidos;
	}

	static create ( input ) {
		criptidos.push(input);
	}

	static update( { id, input } ) {
		const criptidoIndex = criptidos.findIndex( criptido => criptido.id === id);

		console.log("Value desde modelo", input)
		if (criptidoIndex === -1) return false

		const actualCriptido = {
			...criptidos[criptidoIndex],
			...input
		}
		criptidos[criptidoIndex] = actualCriptido;

		return criptidos[criptidoIndex];
		
	}
}
