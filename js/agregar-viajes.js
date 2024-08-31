const formulario = document.getElementById('tarjetaDestino');
let resultado = document.getElementById("result");

formulario.addEventListener('submit', manejarDatos);

function manejarDatos(e) {
    e.preventDefault();
    
    if (!validarFormulario()) {
        return;
    }

    const { destino, presupuesto, dias, hospedaje, otros, comida } = obtenerValoresFormulario();
    const gastos = calcularGastos(hospedaje, otros, comida);
    const balance = calcularBalance(presupuesto, gastos);
    const promedioDiario = calcularPromedioDiario(presupuesto, dias);
    const promedioDiarioDespuesGastos = calcularPromedioDiarioDisponible(balance, dias);
    
    const nuevoDestino = crearNuevoDestino({ 
        destino, presupuesto, dias, hospedaje, otros, comida, gastos, balance, promedioDiario, promedioDiarioDespuesGastos});

    guardarLocalStorage(nuevoDestino);
    
    UI(destino, presupuesto, dias, balance, promedioDiario, promedioDiarioDespuesGastos);
}

function obtenerValoresFormulario() {
    return {
        destino: formulario.destino.value,
        presupuesto: formulario.presupuesto.value,
        dias: formulario.dias.value,
        hospedaje: formulario.hospedaje.value,
        otros: formulario.otros.value,
        comida: formulario.comida.value
    };
}

function calcularGastos(hospedaje, otros, comida) {
    return parseInt(hospedaje) + parseInt(otros) + parseInt(comida);
}

function calcularBalance(presupuesto, gastos) {
    return parseInt(presupuesto) - gastos;
}

function calcularPromedioDiario(presupuesto, dias) {
    return Math.floor(parseInt(presupuesto) / parseInt(dias));
}

function calcularPromedioDiarioDisponible(balance, dias) {
    return Math.floor(parseInt(balance) / parseInt(dias));
}

class NuevoDestino {   
    constructor({ destino, presupuesto, dias, hospedaje, otros, comida, gastos, balance, promedioDiario, promedioDiarioDespuesGastos }) {
        this.destino = destino;
        this.presupuesto = presupuesto;
        this.dias = dias;
        this.hospedaje = hospedaje;
        this.otros = otros;
        this.comida = comida;
        this.gastos = gastos;
        this.balance = balance;
        this.promedioDiario = promedioDiario;
        this.promedioDiarioDespuesGastos = promedioDiarioDespuesGastos;
    }
    //preguntar al profe si es recomendable hacer un array de gastos y dentro un objeto con categoria de gastos y sumarlos entre ellos. haciendo un reduce
}

function crearNuevoDestino(data) {
    return new NuevoDestino(data);
}

function guardarLocalStorage(nuevoDestino) {
    let tarjetaViaje = JSON.parse(localStorage.getItem('tarjetaViaje')) || []; 
    tarjetaViaje.push(nuevoDestino);
    localStorage.setItem('tarjetaViaje', JSON.stringify(tarjetaViaje));
}

function UI(destino, presupuesto, dias, balance, promedioDiario, promedioDiarioDespuesGastos) {
    let imprimirDatos = document.createElement("div");
    
    imprimirDatos.innerHTML = `
        <div class="div-icons">
          <img class="icon" src="../assets/icons/Plane_icon.svg.png" alt="" />
          <img class="icon" src="../assets/icons//wallet-32.png" />
          <img class="icon coin" src="../assets/icons/icons8-coin-50.png">
        </div>
        <div class="container-data">
            <div class="title-expens">
                <span id="destinoTarjeta">${destino}</span>
            </div>
            <div class="title-expens">
                <span>${presupuesto}</span>
            </div>
            <div class="title-expens">
                <span>${balance}</span>
            </div>
        </div>
        <h1 class="promedio">El dinero diario es: $${promedioDiario}</h1>
        <h2 class="promedio">Los días de viaje planificados son: ${dias}</h2>
        <h2 class="disponible">El dinero diario disponible después de gastos es: $${promedioDiarioDespuesGastos}</h2>
        
    `;
    
    mostrarAlerta(balance);
    resultado.appendChild(imprimirDatos);
    redireccionar();
}

function mostrarAlerta(balance) {
   if (balance < 0) {
        resultado.innerHTML = `Necesitas conseguir aún $${Math.abs(balance)} para pagar las vacaciones que te mandaste.`;
        resultado.style.color = "red";
        resultado.style.paddingLeft = "5px";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";
    } else if( balance === 0) {
        resultado.innerHTML = "llegaste justo a las vacaciones.";
        resultado.style.color = "green";
        resultado.style.paddingLeft = "5px";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";
    }else{
        resultado.innerHTML = "Todavía puedes darte un gusto.";
        resultado.style.color = "green";
        resultado.style.paddingLeft = "5px";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";
        
    }
    
}
function redireccionar (){
    setTimeout(() =>{
        window.location.href = "../pages/guardados.html"
     },4000)
}
 

function validarFormulario() {
    const { destino, presupuesto, dias, hospedaje, otros, comida } = obtenerValoresFormulario();

    // Validar que el destino sea solo texto
    const regexTexto = /^[a-zA-Z\s]+$/;
    if (!regexTexto.test(destino)) {
        alert("El campo 'Destino' solo debe contener letras y espacios.");
        return false;
    }

    // Validar que los otros campos sean números positivos
    if (isNaN(presupuesto) || presupuesto <= 0) {
        alert("El campo 'Presupuesto' debe ser un número positivo.");
        return false;
    }
    if (isNaN(dias) || dias <= 0) {
        alert("El campo 'Días' debe ser un número positivo.");
        return false;
    }
    if (isNaN(hospedaje) || hospedaje < 0) {
        alert("El campo 'Hospedaje' debe ser un número positivo.");
        return false;
    }
    if (isNaN(otros) || otros < 0) {
        alert("El campo 'Otros' debe ser un número positivo.");
        return false;
    }
    if (isNaN(comida) || comida < 0) {
        alert("El campo 'Comida' debe ser un número positivo.");
        return false;
    }

    return true;
}
