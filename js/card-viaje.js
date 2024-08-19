
function cargarTarjetas() {

  const tarjetaViaje = obtenerTarjetasDesdeLocalStorage();
  const cardContainer = document.getElementById("card");

  cardContainer.innerHTML = "";


  tarjetaViaje.forEach((nuevoDestino, index) => {
    const tarjetaHTML = mostrarTarjetaGuardada(nuevoDestino, index);
    cardContainer.innerHTML += tarjetaHTML;
  });
}

function obtenerTarjetasDesdeLocalStorage() {
  return JSON.parse(localStorage.getItem("tarjetaViaje")) || [];
}

function mostrarTarjetaGuardada({
  destiny,
  budget,
  balance,
  promedioDiarioDespuesGastos,
  days,
}, index) {
  return `
             <section class="card2-container">
                <h2 class="title">Ciudad: ${destiny}</h2><br>
                <article class="list-button-card">
                    <div class="item-card-viaje">
                        <h3>Presupuesto:</h3> <span>$${budget}</span>
                    </div>
                    <div class="item-card-viaje">
                        <h3>Días de Viaje:</h3> <span>${days}</span>
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
                <button id="button-movilidad"  class="buttonTarjeta">Trasporte</button>
                <button id="button-otros"  class="buttonTarjeta">Otros</button>
                <button id="button-alojamiento"  class="buttonTarjeta">Hotel</button>
                <button id="button-comida"  class="buttonTarjeta">Comida</button>
                <button id="button-excursiones"  class="buttonTarjeta">Bebidas</button>
                <button id="button-actividades"  class="buttonTarjeta">Compras</button>
                <button id="button-tours"  class="buttonTarjeta">Tours</button>
                <button id="button-entradas"  class="buttonTarjeta">Entradas</button>
            </section>
            <button type="button" class="button-editar" id="editar">EDITAR</button>
 
  `;
}

cargarTarjetas();
