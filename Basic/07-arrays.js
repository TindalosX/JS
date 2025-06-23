// Arrays

// array sin valores (vacío)
let array = [];
// array inicializado.
let array2 = ['a', 1, true];

console.log(array)
console.log(array2)
console.log()

// agregra un valor mediante indice
array[3] = 'Soy'; // -es valido-

console.log(array)
console.log()

// Métodos comunes para arrays.

// push agrega el elemento al final del array.
array.push(false);
array.push(12.55);

console.log(array)
console.log()

// pop elimina el último elemento del array.
array.pop()

console.log(array)

console.log(array.pop()) // muestra el elemento eliminado.
console.log()

// shift elimina el primer elemento del array.

array[0] = 'hola';
array[1] = 'red';
array[2] = '12345';

console.log(array);
console.log();

array.shift();

console.log(array);
console.log();

// unshift agrega desde el inicio del array.
// se deben pasar los elementos a agregar.
array.unshift("helado", 'guitarra');

console.log(array);
console.log();

// propieda length, para mostrar la longitud del array

console.log(array.length); //mostra la longitud de array.
console.log()

// Limpiar array (eliminar elementos de array).

//~ array = []; // se inicializa el array como vacío.
//~ console.log(array);
//~ console.log();

// slice para extraer una porción (slide) del array original sin
//modificarlo.

//primer valor indice de inicio.
//segundo valor indice final (no incuido).
let sliceArray = array.slice(1, 2);
console.log(sliceArray);
console.log();

// Método splice() para eliminar un elemento del array
console.log("Array inical:");
console.log(array);

//obtener el indice
let i_element = array.indexOf("12345");

//~ console.log("indice negativo")
//~ console.log(array[-2]); undefined

console.log(i_element)
// splice(inicio, número_elementos_a_eliminar)
array.splice(i_element, 1);

console.log("Después de splice");
console.log(array)
