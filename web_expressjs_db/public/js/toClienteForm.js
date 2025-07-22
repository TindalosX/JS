//Agregar
document.getElementById('add-criptido').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los valores del formulario
    const id = document.getElementById('id-create').value;
    const name = document.getElementById('name-create').value;
    const types = Array.from(document.querySelectorAll('input[name="type[]"]:checked'))
                     .map(checkbox => checkbox.value);

    // Crear el objeto de datos a enviar
    const data = {
        id: id,
        name: name,
        type: types
    };

    try {
        const response = await fetch('/criptidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Error || 'Error en la solicitud');
        }

        const result = await response.json();
        console.log('Criptido agregado:', result);
        
        // Opcional: Limpiar el formulario
        document.getElementById('add-criptido').reset();
        
    } catch (error) {
        console.error('Error:', error.message);
        const addMessError = document.getElementById('mess-error')
        addMessError.textContent = '⚠ ' + error.message;
    }
});

//Update
document.getElementById('updateCriptido').addEventListener('submit', async function(event) {
	event.preventDefault();

	const id = document.getElementById('id-update').value;
	const nombre = document.getElementById('name-update').value;
	
	// Crear el objeto de datos a enviar
    const data = {
        id: id,
        name: nombre
    };

    console.log("Data", data);

    try {
        const response = await fetch(`/criptidos/${encodeURIComponent(id)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.Error || 'Error en la solicitud');
        }
        
    } catch (error) {
        console.error('Error message toCliente:', error.message);
        console.error('Error toCliente:', error);
    }
});
