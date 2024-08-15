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







 const formularo = document.getElementById('tarjetaDestino');


formularo.addEventListener('submit', crearTarjeta)

function crearTarjeta(e) {
    e.preventDefault(); 

    const destiny = formularo.destiny.value;
    const budget = formularo.budget.value;
    const days = formularo.days.value;
    const acomodation = formularo.acomodation.value;
    const otros = formularo.otros.value;
    const food = formularo.food.value;
    let promedioDiario = Math.round(parseInt(budget) / parseInt(days));
    let expenses = parseInt(otros) + parseInt(acomodation) + parseInt(food);
    let balance = parseInt(budget) - expenses;
    let promedioDiarioDespuesGastos = Math.round(parseInt(balance) / parseInt(days));
    const nuevoDestino = {
        destiny: destiny,
        budget: budget,
        days: days,
        balance: balance,   
        acomodation: acomodation,
        food: food,
        otros: otros,
        promedioDiario: promedioDiario,
        disponible: promedioDiarioDespuesGastos,
    };

    
    let tarjetaViaje = JSON.parse(localStorage.getItem('tarjetaViaje')) || []; 
    tarjetaViaje.push(nuevoDestino);

    localStorage.setItem('tarjetaViaje', JSON.stringify(tarjetaViaje));

    
    UI (destiny,budget,days, balance, promedioDiario, promedioDiarioDespuesGastos)
    
};

function UI (destiny,budget,days, balance, promedioDiario, promedioDiarioDespuesGastos){
    let result = document.getElementById("result");
    let dataPrint = document.createElement("div")
    
    dataPrint.innerHTML = `
    
    <div class="container-data">
        <div class="title-expens">
            <span>${destiny}</span>
        </div>
        <div class="title-expens">
            <span>${budget}</span>
        </div>
        <div class="title-expens balance">
            <span>${balance}</span>
        </div>
    </div>
    <h1 class="promedio">El dinero diario es: $${promedioDiario}</h1>
    <h2 class="promedio">Los dias de viaje planificados son: ${days}</h2>
    <h2 class="disponible">El dinero diario disponible despues de gastos es: $${promedioDiarioDespuesGastos}</h2>
    
    `
    if(balance < 0){
        
        alert(`necesitas conseguir aun $${balance} para pagar las vacaciones que te mandaste`)
        
    }else{
        
        alert("todavia podes darte un gusto")
        
    }
    result.appendChild(dataPrint);
}
