//adquirimos los elementos del DOM donde vamos a ingresar los datos de usuario:
//declaramos constantes que son variables que no cambian en el tiempo//
const form = document.getElementById('formRegister');
const entradaNombre = document.getElementById('nameinput'); //Le cambio el nombre a la variable, de «nameinput», a «entradaNombre».
const entradaId = document.getElementById('Idinput'); /* Corregido el nombre del campo de entrada de email. //Le cambio el nombre a la variable, de «emailinput», a «entradaId». */

//donde vamos a pintar los datos de Usuario//
const tablebody = document.getElementById('tablebody');

//Colocar la fecha.
function displayDate() {
    document.getElementById("submitbutton").innerHTML = Date();
}

/* 1. Para almacenar estos datos en el localStore, al actualizar, no se borre la info:
   2. Se crea una variable "let" que es dinámica, con el nombre "data" porque será nuestra base de datos
   3. JSON.parse porque esos datos los adquirimos y convertimos en objetos almacenables como los arrays
   4. Guardamos en localStorage en el navegador bajo la función formData() que son los datos de nuestro formulario: */

let data = JSON.parse(localStorage.getItem('formData')) || [];

// Creamos funcion para que al evento "submit" click al botón (agregar), almacene la información en memoria

form.addEventListener('submit', function(event) {

    //elimina comportamientos por defecto del formulario
    event.preventDefault();

    const name = entradaNombre.value;
    const idUsuario = entradaId.value; //Le cambio el nombre a la constante de «email», a «idUsuario».
    // Obtiene la fecha y hora actual
    const currentDate = new Date().toLocaleString();
    

    if (name && idUsuario) {
        const newData = { name, idUsuario, date: currentDate }; // Corregido el nombre del campo de email
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        //Función para borrar y volver a iniciar de JavaScript no se necesita crear
        form.reset();
    } else {
        alert('Favor llenar todos los campos');
    }
})

//Función para guardar los datos del formulario:
function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}



//Función para renderizar o actualizar el formulario, limpia el contenido de la tabla para nuevo registro:
function renderTable() {
    tablebody.innerHTML = '';

    //Para generar todos los registros del formulario en una tabla necesitamos iterar el "data" (toda la información) y crear la tabla
    // compuesta de un item e index, cada elemento tendrá su puesto en la tabla.
    data.forEach(function(item, index) {
        // Creamos la nueva fila que contendrá los datos del formulario.
        const newRow = document.createElement('tr');

        // Creamos las celdas para los datos del formulario.
        const nameCell = document.createElement('td');
        const idUsuarioCell = document.createElement('td'); //Le cambio el nombre a la constante de «emailCell», a «idUsuarioCell». // Corregido el nombre del campo de email
        const dateCell = document.createElement('td'); //Le cambio el nombre a la constante de «actionCell», a «dateCell».
        const actionCell = document.createElement('td');

        // Creamos los botones para editar y eliminar.
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        // Asignamos el contenido a las celdas.
        nameCell.textContent = item.name;
        idUsuarioCell.textContent = item.idUsuario; // Corregido el nombre del campo de email
        dateCell.textContent = item.date; // Renderiza la hora almacenada en localStorage

        // Asignamos el texto a los botones.
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

        // Asignamos clases a los botones.
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

        // Añadimos eventos de escucha a los botones.
        editButton.addEventListener('click', function() {
            editData(index);
        });

        deleteButton.addEventListener('click', function() {
            deleteData(index);
        });

        // Agregamos los botones a la celda de acciones.
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Añadimos las celdas a la nueva fila.
        newRow.appendChild(nameCell);
        newRow.appendChild(idUsuarioCell); // Corregido el nombre del campo de email
        newRow.appendChild(dateCell);
        newRow.appendChild(actionCell);

        // Insertamos la nueva fila justo después de la fila de cabecera.
        const headerRow = document.querySelector('.crudtable thead tr');
        headerRow.parentNode.insertBefore(newRow, headerRow.nextSibling);
    });
}

// Confección de las funciones de editar y eliminar
function editData(index) {
    const item = data[index];
    entradaNombre.value = item.name;
    entradaId.value = item.idUsuario; // Corregido el nombre del campo de email
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
