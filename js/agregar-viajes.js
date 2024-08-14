const formulario = document.getElementById('tarjetaDestino');


formulario.addEventListener('click', crearTarjeta)

let continuar = true;
function crearTarjeta(e) {
    e.preventDefault(); 

    while (continuar) {const destiny = prompt('Introduce el destino:');
        const budget = prompt('Introduce el presupuesto total:');
        const days = prompt('Introduce la cantidad de días:');
        const acomodation = prompt('Introduce el costo de alojamiento:');
        const otros = prompt('Introduce otros gastos:');
        const food = prompt('Introduce el costo de comida:');
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
    continuar = confirm("¿desea crear otro destino?");
    }
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
    if(balance < 0){
        
        alert(`necesitas conseguir aun $${balance} para pagar las vacaciones que te mandaste`)
        
    }else{
        
        alert("todavia podes darte un gusto")
        
    }
    result.appendChild(dataPrint);
}
