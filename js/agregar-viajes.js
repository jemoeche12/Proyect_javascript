const formulario = document.getElementById('tarjetaDestino');

formulario.addEventListener('submit', manejarDatos);

function manejarDatos(e) {
    e.preventDefault();
    
    const { destiny, budget, days, acomodation, otros, food } = obtenerValoresFormulario();
    const expenses = calcularGastos(acomodation, otros, food);
    const balance = calcularBalance(budget, expenses);
    const promedioDiario = calcularPromedioDiario(budget, days);
    const promedioDiarioDespuesGastos = calcularPromedioDiarioDisponible(balance, days);
    
    const nuevoDestino = crearNuevoDestino({ 
        destiny, budget, days, acomodation, otros, food, expenses, balance, promedioDiario, promedioDiarioDespuesGastos});

    guardarLocalStorage(nuevoDestino);
    
    UI(destiny, budget, days, balance, promedioDiario, promedioDiarioDespuesGastos);
}

function obtenerValoresFormulario() {
    return {
        destiny: formulario.destiny.value,
        budget: formulario.budget.value,
        days: formulario.days.value,
        acomodation: formulario.acomodation.value,
        otros: formulario.otros.value,
        food: formulario.food.value
    };
}

function calcularGastos(acomodation, otros, food) {
    return parseInt(acomodation) + parseInt(otros) + parseInt(food);
}

function calcularBalance(budget, expenses) {
    return parseInt(budget) - expenses;
}

function calcularPromedioDiario(budget, days) {
    return Math.floor(parseInt(budget) / parseInt(days));
}

function calcularPromedioDiarioDisponible(balance, days) {
    return Math.floor(parseInt(balance) / parseInt(days));
}

class NuevoDestino {   
    constructor({ destiny, budget, days, acomodation, otros, food, expenses, balance, promedioDiario, promedioDiarioDespuesGastos }) {
        this.destiny = destiny;
        this.budget = budget;
        this.days = days;
        this.acomodation = acomodation;
        this.otros = otros;
        this.food = food;
        this.expenses = expenses;
        this.balance = balance;
        this.promedioDiario = promedioDiario;
        this.promedioDiarioDespuesGastos = promedioDiarioDespuesGastos;
    }
}

function crearNuevoDestino(data) {
    return new NuevoDestino(data);
}

function guardarLocalStorage(nuevoDestino) {
    let tarjetaViaje = JSON.parse(localStorage.getItem('tarjetaViaje')) || []; 
    tarjetaViaje.push(nuevoDestino);
    localStorage.setItem('tarjetaViaje', JSON.stringify(tarjetaViaje));
}

function UI(destiny, budget, days, balance, promedioDiario, promedioDiarioDespuesGastos) {
    let result = document.getElementById("result");
    let imprimirdatos = document.createElement("div");
    
    imprimirdatos.innerHTML = `
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
        <h2 class="promedio">Los días de viaje planificados son: ${days}</h2>
        <h2 class="disponible">El dinero diario disponible después de gastos es: $${promedioDiarioDespuesGastos}</h2>
    `;
    
    mostrarAlerta(balance);
    result.appendChild(imprimirdatos);
}

function mostrarAlerta(balance) {
    if (balance <= 0) {
        alert(`Necesitas conseguir aún $${Math.abs(balance)} para pagar las vacaciones que te mandaste.`);
    } else {
        alert("Todavía puedes darte un gusto.");
    }
}
