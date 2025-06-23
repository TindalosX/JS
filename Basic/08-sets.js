// sets, no permite elementos repetidos.

//delclaración de set vacío
//~ let myset = new Set();

// Declaración de set inicializado.
// Para inicilaizar un set los valores deben in dentro de corchetes [].
let myset = new Set(['a', 1, "a", true, 2]);

console.log(myset)
console.log()

// Métodos comunes de sets.

// add agrega el elemento al final del set.
myset.add(12.35);
console.log(myset);
console.log();

// delete elimina el elemento del set.
// Para eliminar un elemento de un set se debe pasar el valor a eliminar
//no un indice.
myset.delete('a');

console.log(myset);
console.log();

// Ver que retorna delete.
// El valor retornado por delete es true o false.
// Si se elimino el elemento devuelve true, si no devuelve false.
console.log(myset.delete(1));
console.log();

// has para saber si el set tiene un elemento en concreto.
// Si el valor estra en el set retorna true, si no retorna false.
console.log("has")
console.log(myset.has(2));
console.log(myset.has('a'));
console.log()

// size para mostra el tamaño del set
console.log(myset);
console.log(myset.size);
console.log()
