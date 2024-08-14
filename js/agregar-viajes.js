const formulario = document.getElementById('tarjetaDestino');


formulario.addEventListener('click', crearTarjeta)


function crearTarjeta(e) {
    e.preventDefault(); 
  
        const destiny = formulario.destiny.value;
        const budget = formulario.budget.value;
        const days = formulario.days.value;
        const acomodation = formulario.acomodation.value;
        const otros = formulario.otros.value;
        const food = formulario.food.value;
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

    
    UI (destiny,budget, balance, promedioDiario, promedioDiarioDespuesGastos)
    
    };

function UI (destiny,budget, balance, promedioDiario, promedioDiarioDespuesGastos){
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
    <h2 class="disponible">El dinero diario disponible despues de gastos es: $${promedioDiarioDespuesGastos}</h2>
    `
   
    result.appendChild(dataPrint);
}
