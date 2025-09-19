//Agregar
document.getElementById('add-criptido').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita la recarga de la página

    // Obtener los valores del formulario
    //~ const id = document.getElementById('id-create').value;
    const name = document.getElementById('name-create').value;
    const types = Array.from(document.querySelectorAll('input[name="type[]"]:checked'))
                     .map(checkbox => checkbox.value);

    // Crear el objeto de datos a enviar
    const data = {
        nombre: name,
        tipo: types
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
            const error = new Error(errorData.Error || 'Error en la solicitud');
            error.status = response.status;
            throw error;
        }

        const result = await response.json();

        if (result.message) {
			const addMessError = document.getElementById('mess-error')
			addMessError.textContent = '-> ' + result.message;
		}
        
        // Opcional: Limpiar el formulario
        document.getElementById('add-criptido').reset();
        
    } catch (error) {
        switch (error.status)
		{
			case 400:
				const addMessError = document.getElementById('mess-error')
				addMessError.textContent = '⚠ ' + error.message;//'Ha ocurrido un error al crear el registro';
				break;
			case 403:
				window.location.href = '../pages/http/403.html'
				break;
			default:
				console.log("switch->",error)
		}
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
