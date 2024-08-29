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
    <section class="containerGastosEditar">
      <label>Agregar gasto a ${tipoGasto}:</label>
      <input type="text" placeholder="Ingrese el detalle del gasto" />
      <input type="number" />
      <button type="button" class="button-editar" id="enviar">ENVIAR</button>
    </section>
  `;
  modal.innerHTML = modalContent;
}