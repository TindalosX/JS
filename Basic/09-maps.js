// Declarar un map.
let myMap = new Map(); // map vació.

console.log(myMap);
console.log();

// Inicializar map, llave-valor

myMap = new Map([
	[ "one", "uno"],
	[ "two", "dos"],
	[ "three", "tres"]
])
console.log(myMap)
console.log();

//Métodos de map.

// Agregar/guardar datos con set(key, value)
myMap.set(1, "one");

console.log(myMap);

// Una llave en un map puedo solo aparecer una vez
myMap.set("one", {
	one: "uno",
	1: "uno"
});

console.log(myMap);
console.log();

// Obtener llave (si existe) con get().
console.log(myMap.get("one")); // la llave existe, devuelve el valor
console.log(myMap.get("red")); // la llave no existe, undefinde
console.log();

// Verificar si la llave existe con has().
console.log(myMap.has("one")) // existe la llave, devuelve true
console.log(myMap.has("red")) // no existe la llave devuelve false
console.log();

// Borrar elemento con delete().
console.log(myMap.delete("one")) // existe la llave, devuelve true
console.log(myMap.delete("red")) // no existe la llave devuelve false

console.log();

console.log(myMap);
console.log()

// Saber el tamaño del map con la propiedad size
console.log("Tamaño map: ", myMap.size)
console.log();

if (myMap.size === 0) {
	console.log("El mapa está vacío");
}

// Métodos keys, values y entries

console.log(myMap.keys());
console.log();
console.log(myMap.values());
console.log();

console.log("Entries.");
const iterados = myMap.entries();
console.log(iterados);
console.log(iterados.next().value);
console.log(typeof iterados);
console.log();

// Limpiar map con clear()
myMap.clear(); // Elimina todos los pares llave-valor
console.log(myMap);

if (myMap.size === 0) {
	console.log("El mapa está vacío");
}
