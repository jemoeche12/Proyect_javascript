 // Array vacío para almacenar los objetos
 const datosFormulario = [];

 // Seleccionar el formulario
 const formulario = document.getElementById('vacationCalc');

 // Escuchar el evento submit del formulario
 formulario.addEventListener('submit', function(event) {
     event.preventDefault(); // Prevenir el envío del formulario

     // Crear un objeto para almacenar los datos
     const datos = {};

     // Obtener los elementos del formulario
     const elementos = formulario.elements;

     // Recorrer los elementos del formulario
     for (let i = 0; i < elementos.length; i++) {
         const elemento = elementos[i];
         if (elemento.destiny) {
             datos[elemento.destiny] = elemento.value; // Asignar el valor al objeto
         }
     }

     // Pushear el objeto al array
     datosFormulario.push(datos);

     // Mostrar el array en la consola (opcional)
     console.log(datosFormulario);
 });