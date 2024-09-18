


const formulario = document.getElementById('tarjetaDestino');
let resultado = document.getElementById("result");

formulario.addEventListener('submit', manejarDatos);

function manejarDatos(e) {
    e.preventDefault();

    if (!validarFormulario()) {
        return;
    }

    const { destino, presupuesto, dias, hospedaje, otros, comida } = obtenerValoresFormulario();

    const generarId = () => Date.now() + Math.random().toString(36).substring(2, 9);

    const gastos = [
        { categoria: "entradas", cantidad: 0, id: generarId(), descripcion: "" },
        { categoria: "hospedaje", cantidad: parseInt(hospedaje) || 0, id: generarId(), descripcion: "" },
        { categoria: "otros", cantidad: parseInt(otros) || 0, id: generarId(), descripcion: "" },
        { categoria: "comida", cantidad: parseInt(comida) || 0, id: generarId(), descripcion: "" },
        { categoria: "compras", cantidad: 0, id: generarId(), descripcion: "" },
        { categoria: "tours", cantidad: 0, id: generarId(), descripcion: "" },
        { categoria: "transporte", cantidad: 0, id: generarId(), descripcion: "" },
        { categoria: "ocio", cantidad: 0, id: generarId(), descripcion: "" }
    ];

    const totalGastos = calcularGastos(gastos);

    const balance = calcularBalance(parseInt(presupuesto), totalGastos);

    const promedioDiario = calcularPromedioDiario(parseInt(presupuesto), parseInt(dias));
    const promedioDiarioDespuesGastos = calcularPromedioDiarioDisponible(balance, parseInt(dias));

    const nuevoDestino = crearNuevoDestino({
        destino, presupuesto, dias, gastos, balance, promedioDiario, promedioDiarioDespuesGastos
    });

    guardarLocalStorage(nuevoDestino);

    UI(destino, presupuesto, dias, balance, promedioDiario, promedioDiarioDespuesGastos);
}

function obtenerValoresFormulario() {
    const { destino, presupuesto, dias, hospedaje, otros, comida } = formulario
    return {
        destino: destino.value,
        presupuesto: presupuesto.value,
        dias: dias.value,
        hospedaje: hospedaje.value,
        otros: otros.value,
        comida: comida.value
    };
}

class NuevoDestino {
    constructor({ destino, presupuesto, dias, gastos, balance, promedioDiario, promedioDiarioDespuesGastos }) {
        this.destino = destino;
        this.presupuesto = parseInt(presupuesto);
        this.dias = parseInt(dias);
        this.gastos = gastos;
        this.balance = balance;
        this.promedioDiario = promedioDiario;
        this.promedioDiarioDespuesGastos = promedioDiarioDespuesGastos;
    }
}

function calcularGastos(gastos) {
    return gastos.reduce((total, gasto) => total + gasto.cantidad, 0);
}

function calcularBalance(presupuesto, totalGastos) {
    return presupuesto - totalGastos;
}

function calcularPromedioDiario(presupuesto, dias) {
    return Math.floor(presupuesto / dias);
}

function calcularPromedioDiarioDisponible(balance, dias) {
    return Math.floor(balance / dias);
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
          <img class="icon" src="../assets/icons/wallet-32.png" />
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
        resultado.innerHTML = `Necesitas conseguir aún $${Math.abs(balance)} para pagar las vacaciones.`;
        resultado.style.color = "red";
        resultado.style.fontWeight = "600";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";

    } else if (balance === 0) {
        resultado.innerHTML = "Llegaste justo a las vacaciones.";
        resultado.style.color = "green";
        resultado.style.fontWeight = "600";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";

    } else {
        resultado.innerHTML = "Todavía puedes darte un gusto.";
        resultado.style.color = "green";
        resultado.style.fontWeight = "600";
        resultado.style.fontSize = "20px";
        resultado.style.textTransform = "uppercase";
    }
}

function redireccionar() {
    setTimeout(() => {
        window.location.href = "../pages/guardados.html";
    }, 4000);
}

function validarFormulario() {
    const { destino, presupuesto, dias, hospedaje, otros, comida } = obtenerValoresFormulario();

    const regexTexto = /^[a-zA-Z\s]+$/;
    if (!regexTexto.test(destino)) {
        avisarTextoInvalido();
        return false;
    }

    if (isNaN(presupuesto) || presupuesto <= 0) {
        ingresarNumeros();
        return false;
    }
    if (isNaN(dias) || dias <= 0) {
        ingresarNumeros();
        return false;
    }
    if (isNaN(hospedaje) || hospedaje < 0) {
        ingresarNumeros();
        return false;
    }
    if (isNaN(otros) || otros < 0) {
        ingresarNumeros();
        return false;
    }
    if (isNaN(comida) || comida < 0) {
        ingresarNumeros();
        return false;
    }

    return true;
}

function avisarTextoInvalido() {
    Swal.fire({
        title: " En destino, Debes ingresar texto, por favor",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
    });
}
function ingresarNumeros(){
    Swal.fire({
        title: "Debes ingresar numeros, por favor",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
    });
}