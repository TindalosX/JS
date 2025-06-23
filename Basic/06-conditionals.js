let age = 32;

// if, else if, else
if (age == 32) {
	console.log("La edad es 32");
} else if (age < 18) {
	console.log("Es menor de edad");
} 
else {
	console.log("La edad no es 32");
}

//Operador ternario

let mensaje;

mensaje = age == 32 ? "--La edad es 32" : "--La edad no es 32";
console.log(mensaje)
console.log()

let opc =  'd';

switch (opc)
{
	case 'a':
		console.log("Haz escogido al opción a)");
		break;
	case 'b':
		console.log("Haz escogido al opción b)");
		break;
	case 'c':
		console.log("Haz escogido al opción c)");
		break;
	default:
		console.log("Opción no valida");
}
