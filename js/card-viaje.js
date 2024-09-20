function cargarTarjetas() {
  const tarjetaViaje = obtenerTarjetasDesdeLocalStorage();
  const contenedorTarjetas = document.getElementById("card");

  
  contenedorTarjetas.innerHTML = "";

  const tarjetaSeleccionadaIndex = localStorage.getItem("tarjetaSeleccionada");
  
  if (tarjetaSeleccionadaIndex !== null) {
    const tarjetaSeleccionada = tarjetaViaje[tarjetaSeleccionadaIndex];
    const tarjetaHTML = mostrarTarjetaGuardada(tarjetaSeleccionada, tarjetaSeleccionadaIndex);
    contenedorTarjetas.innerHTML = tarjetaHTML;

    const botonesGastos = document.querySelectorAll(".buttonTarjeta");
    botonesGastos.forEach((boton) => {
      boton.addEventListener("click", capturarId);
    });
  }
}

function obtenerTarjetasDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("tarjetaViaje")) || [];
}

function mostrarTarjetaGuardada({ destino, presupuesto, balance, promedioDiarioDespuesGastos, dias }) {
  return `
             <section class="card2-container">
                <h2 class="title">Ciudad: ${destino}</h2><br>
                <article class="list-button-card">
                    <div class="item-card-viaje">
                        <h3>Presupuesto:</h3> <span>$${presupuesto}</span>
                    </div>
                    <div class="item-card-viaje">
                        <h3>Días de Viaje:</h3> <span>${dias}</span>
                    </div>
                    <div class="item-card-viaje">
                        <h3>Balance:</h3> <strong>$<span class="balanc">${balance}</span></strong>
                    </div>
                    <div class="item-card-viaje">
                        <h3>Disponible diario después de gastos:</h3> <strong>$<span class="balanc">${promedioDiarioDespuesGastos}</span></strong>
                    </div>
                </article>
             </section>
             <section class="button-card">
                <button id="transporte"  class="buttonTarjeta">Trasporte</button>
                <button id="hotel"  class="buttonTarjeta">Hotel</button>
                <button id="comida" class="buttonTarjeta">Comida</button>
                <button id="bebida"  class="buttonTarjeta">Bebidas</button>
                <button id="compras"  class="buttonTarjeta">Compras</button>
                <button id="tours" class="buttonTarjeta">Tours</button>
                <button id="entradas"  class="buttonTarjeta">Entradas</button>
                <button id="otros" class="buttonTarjeta">Otros</button>
            </section>
  `;
}

cargarTarjetas();

function capturarId(e) {
  const tipoGasto = e.currentTarget.id;
  const modal = document.getElementById("editarGastos");
  const modalContent = `
  <form id="form" class="containerGastosEditar">
  <label>Agregar gasto a ${tipoGasto}:</label>
  <input id="detalle" type="text" placeholder=" Ingrese el detalle del gasto" />
  <input id="cantidad" type="number" /> $
  <button type="button" class="button-editar" id="enviar">ENVIAR</button>
  </form>
  `;
  modal.innerHTML = modalContent;

  const buttonEnviarGasto = document.getElementById("enviar");
  buttonEnviarGasto.addEventListener("click", () => validarForm(tipoGasto));
  
}


function validarForm(tipoGasto){
  const detalle = document.getElementById("detalle").value;
  const cantidad = parseFloat(document.getElementById("cantidad").value);

  if(isNaN(cantidad) || cantidad === 0 || cantidad <= 0 || detalle === ""){
    console.error("por favor ingrese una cantidad/descripcion valida")
  } 
  actualizarBalance(tipoGasto, cantidad, detalle);
  alertarErrorUsuario(tipoGasto, cantidad, detalle)
}

function actualizarBalance(tipoGasto, cantidad){
  const tarjetaViaje = obtenerTarjetasDesdeLocalStorage();
  const tarjetaSeleccionadaIndex = localStorage.getItem("tarjetaSeleccionada");

  if(tarjetaSeleccionadaIndex !== null){
    const tarjetaSeleccionada = tarjetaViaje[tarjetaSeleccionadaIndex];

    tarjetaSeleccionada.balance -= cantidad;

    if(!tarjetaSeleccionada.gastos){
      tarjetaSeleccionada.gastos = {};

    }
    if(!tarjetaSeleccionada.gastos[tipoGasto]){
      tarjetaSeleccionada.gastos[tipoGasto] = 0;
    }
    tarjetaSeleccionada.gastos[tipoGasto] += parseFloat(cantidad);
    tarjetaViaje[tarjetaSeleccionadaIndex] = tarjetaSeleccionada;
    localStorage.setItem("tarjetaViaje", JSON.stringify(tarjetaViaje));
    
    actualizarBalanceGastos(tarjetaSeleccionada.balance);
  }
}
  function actualizarBalanceGastos(nuevoBalance){
    const balanceElemento = document.querySelector(".balanc");
    balanceElemento.textContent = nuevoBalance.toFixed(2);

  }
  function alertarErrorUsuario(tipoGasto, cantidad, detalle) {
    Swal.fire({
        title: `el gasto ingresado es ${cantidad} y corresponde a ${detalle}, categoria: ${tipoGasto}`,
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
